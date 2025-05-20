let favoriteEpisodes = [];

export async function GET() {
    return Response.json({ favoriteEpisodes });
}

export async function POST(request) {
    const body = await request.json(); 
    if (!body?.id) { 
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    if (!favoriteEpisodes.includes(body.id))
        favoriteEpisodes.push(body.id);

    return Response.json({ ok: true, favoriteEpisodes });
}

export async function DELETE(request) {
    const body = await request.json(); 
    if (!body?.id) {
        return Response.json({ error: "id missing" }, { status: 400 });
    }

    favoriteEpisodes = favoriteEpisodes.filter(item => item !== body.id);
    return Response.json({ ok: true, favoriteEpisodes });
}
