//Route handler koji omogućava dohvat, dodavanje i uklanjanje omiljenih epizoda pohranjenih u memoriji servera.
let favoriteEpisodes = [];

//GET vraća trenutni popis omiljenih epizoda kao JSON.
//Ova metoda se koristi za prikaz omiljenih epizoda na klijentskoj strani.
//Nema cache logike jer se favoriti mogu često mijenjati i želimo uvijek najnovije stanje.
export async function GET() {
    return Response.json({ favoriteEpisodes });
}


//POST prima JSON objekt s ID-em epizode koja se dodaje u favorite.
//Provjerava postoji li ID, a metoda includes sprječava dodavanje duplikata u listu.
export async function POST(request) {
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    if (!favoriteEpisodes.includes(body.id))
        favoriteEpisodes.push(body.id);

    return Response.json({ ok: true, favoriteEpisodes });
}

//DELETE prima JSON objekt s ID-em epizode koja se uklanja iz favorite.
//Koristi se filter za uklanjanje svih pojavljivanja danog ID-a iz niza.
export async function DELETE(request) {
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    favoriteEpisodes = favoriteEpisodes.filter(item => item !== body.id);
    return Response.json({ ok: true, favoriteEpisodes });
}
