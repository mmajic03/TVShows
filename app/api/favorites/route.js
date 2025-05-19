let favorites = [];

export async function GET() {
    //vraća trenutni popis favorita u JSON formatu
    return Response.json({ favorites });
}

export async function POST(request) {
    //prima zahtjev za dodavanje novog favorita
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    if (!favorites.includes(body.id))
        favorites.push(body.id);

    return Response.json({ ok: true, favorites });
}

export async function DELETE(request) {
    //prima zahtjev za uklanjanje favorita
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    //uklanja određeni ID iz favorita
    favorites = favorites.filter(item => item !== body.id);
    return Response.json({ ok: true, favorites });
}