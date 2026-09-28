const BASE_URL =
  process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";

const TOKEN =
  process.env.API_ACCESS_TOKEN || process.env.TMDB_API_KEY;

async function tmdbFetch(
  path,
  params = {},
  revalidateSeconds = 1800
) {
  if (!TOKEN) {
    throw new Error(
      "Missing API_ACCESS_TOKEN or TMDB_API_KEY environment variable."
    );
  }

  const cleanBaseUrl = BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${cleanBaseUrl}${cleanPath}`);

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      url.searchParams.set(key, String(value));
    }
  });

  let response;

  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
      next: {
        revalidate: revalidateSeconds,
      },
    });
  } catch (error) {
    console.error("TMDB network error:", error);

    throw new Error(
      `Unable to connect to TMDB for ${cleanPath}`
    );
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    console.error("TMDB API error:", {
      status: response.status,
      path: cleanPath,
      data,
    });

    throw new Error(
      `TMDB request failed (${response.status}) for ${cleanPath}`
    );
  }

  return data || {};
}


/* =========================================================
   TMDB API
========================================================= */

export const tmdb = {
  /* Movies */

  trending: (window = "week") =>
    tmdbFetch(`/trending/movie/${window}`),

  popular: (page = 1) =>
    tmdbFetch("/movie/popular", {
      page,
    }),

  topRated: (page = 1) =>
    tmdbFetch("/movie/top_rated", {
      page,
    }),

  upcoming: (page = 1) =>
    tmdbFetch("/movie/upcoming", {
      page,
    }),

  nowPlaying: (page = 1) =>
    tmdbFetch("/movie/now_playing", {
      page,
    }),


  /* Genres */

  genres: async () => {
    const data = await tmdbFetch("/genre/movie/list");

    return {
      genres: Array.isArray(data?.genres)
        ? data.genres
        : [],
    };
  },

  tvGenres: async () => {
    const data = await tmdbFetch("/genre/tv/list");

    return {
      genres: Array.isArray(data?.genres)
        ? data.genres
        : [],
    };
  },


  /* Movies by genre */

  byGenre: (id, page = 1) =>
    tmdbFetch("/discover/movie", {
      with_genres: id,
      page,
      sort_by: "popularity.desc",
      include_adult: false,
    }),


  /* TV / Web Series */

  webSeries: (page = 1) =>
    tmdbFetch("/tv/popular", {
      page,
    }),

  tvByGenre: (id, page = 1) =>
    tmdbFetch("/discover/tv", {
      with_genres: id,
      page,
      sort_by: "popularity.desc",
      include_adult: false,
    }),


  /* Search */

  search: (query, page = 1, type = "multi") => {
    if (!query?.trim()) {
      return Promise.resolve({
        results: [],
        total_pages: 0,
        total_results: 0,
        page: 1,
      });
    }

    return tmdbFetch(`/search/${type}`, {
      query: query.trim(),
      page,
      include_adult: false,
    });
  },


  /* Generic details */

  details: (id, type = "movie") =>
    tmdbFetch(`/${type}/${id}`, {
      append_to_response:
        "credits,videos,similar,release_dates,images",
    }),


  /* Movie details */

  movieDetails: (id) =>
    tmdbFetch(`/movie/${id}`, {
      append_to_response:
        "credits,videos,similar,release_dates,images",
    }),


  /* TV details */

  tvDetails: (id) =>
    tmdbFetch(`/tv/${id}`, {
      append_to_response:
        "credits,videos,similar,images",
    }),
};


/* =========================================================
   IMAGE HELPERS
========================================================= */

export function tmdbImage(
  path,
  size = "w500"
) {
  if (!path) {
    return null;
  }

  const imageBase =
    process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ||
    "https://image.tmdb.org/t/p";

  const cleanBase = imageBase.replace(/\/+$/, "");
  const cleanPath = String(path).startsWith("/")
    ? String(path)
    : `/${path}`;

  return `${cleanBase}/${size}${cleanPath}`;
}


/* =========================================================
   MEDIA HELPERS
========================================================= */

export function mediaTitle(item) {
  return (
    item?.title ||
    item?.name ||
    item?.original_title ||
    item?.original_name ||
    "Untitled"
  );
}


export function mediaDate(item) {
  return (
    item?.release_date ||
    item?.first_air_date ||
    ""
  );
}