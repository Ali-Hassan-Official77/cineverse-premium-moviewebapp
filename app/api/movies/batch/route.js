import { NextResponse } from "next/server";
import { tmdb } from "@/lib/tmdb";

// GET /api/movies/batch?ids=27205,155,603
// Backend endpoint the reading-list page uses to resolve saved IDs
// (stored client-side in localStorage) into full movie objects.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await Promise.all(
      ids.map((id) => tmdb.details(id).catch(() => null))
    );
    return NextResponse.json({ results: results.filter(Boolean) });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
