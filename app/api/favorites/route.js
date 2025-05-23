//Route handler koji omogućava dohvat, dodavanje i uklanjanje favorita pohranjenih u memoriji servera.
let favorites = [];

//GET vraća favorite kao JSON. 
//Ova metoda se koristi za prikaz favorita na klijentu.
//Nema cache logike jer se favoriti mogu često mijenjati i želimo uvijek najnovije stanje.
export async function GET() {
    return Response.json({ favorites });
}

//POST prima JSON objekt s ID-em koji treba dodati u favorite. Provjeravamo je li ID prisutan, a sa favorites.includes
//spriječava dodavanje duplikata u favorite
export async function POST(request) {
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    if (!favorites.includes(body.id))
        favorites.push(body.id);

    return Response.json({ ok: true, favorites });
}

//DELETE prima JSON objekt s ID-em koji treba ukloniti iz favorita.
//Koristi se filter za uklanjanje svih pojavljivanja danog ID-a iz niza.
export async function DELETE(request) {
    //prima zahtjev za uklanjanje favorita
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    favorites = favorites.filter(item => item !== body.id);
    return Response.json({ ok: true, favorites });
}