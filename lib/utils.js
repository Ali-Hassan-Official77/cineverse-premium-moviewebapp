export function formatYear(dateString) {
  if (!dateString) return "—";
  return dateString.slice(0, 4);
}

export function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatRating(voteAverage) {
  if (voteAverage === undefined || voteAverage === null) return "—";
  return voteAverage.toFixed(1);
}

export function findTrailer(videos) {
  if (!videos?.results?.length) return null;
  const trailer =
    videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
    videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
    videos.results.find((v) => v.site === "YouTube");
  return trailer ? trailer.key : null;
}

export function findCertification(releaseDates) {
  if (!releaseDates?.results?.length) return null;
  const us =
    releaseDates.results.find((r) => r.iso_3166_1 === "US") || releaseDates.results[0];
  const cert = us?.release_dates?.find((r) => r.certification)?.certification;
  return cert || null;
}
