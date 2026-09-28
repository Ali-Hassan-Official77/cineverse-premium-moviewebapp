import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

// GET /api/genre/28?page=2
// Backend endpoint the "Load more" control on the genre page calls for
// subsequent pages, so only the first page needs a full server render.
export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") || 1);

  try {
    const data = await tmdb.byGenre(params.id, page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
