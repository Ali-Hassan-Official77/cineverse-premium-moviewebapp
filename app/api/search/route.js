import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

// GET /api/search?q=inception&page=1
// Backend endpoint used by the client-side search dropdown so the TMDB
// token never has to be exposed to the browser.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";
  const page = Number(searchParams.get("page") || 1);

  if (!query) {
    return NextResponse.json({ results: [], total_pages: 0, total_results: 0 });
  }

  try {
    const data = await tmdb.search(query, page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
