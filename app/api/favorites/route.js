let favorites = [];

export async function GET() {
    return Response.json({ favorites });
}

export async function POST(request) {
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    if (!favorites.includes(body.id))
        favorites.push(body.id);

    return Response.json({ ok: true, favorites });
}

export async function DELETE(request) {
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    favorites = favorites.filter(item => item !== body.id);
    return Response.json({ ok: true, favorites });
}