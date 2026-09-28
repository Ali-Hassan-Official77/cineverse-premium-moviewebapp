
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, Camera } from "lucide-react";

import { tmdb, tmdbImage } from "@/lib/tmdb";
import {
  formatYear,
  formatRuntime,
  findTrailer,
  findCertification,
} from "@/lib/utils";

import SectionGrid from "@/components/SectionGrid";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import SaveButton from "@/components/SaveButton";
import Reveal from "@/components/Reveal";

export const revalidate = 1800;

export async function generateMetadata({ params }) {
  try {
    const m = await tmdb.movieDetails(params.id);

    return {
      title: `${m.title} — Cineverse`,
      description: m.overview?.slice(0, 155),
    };
  } catch {
    return {
      title: "Movie — Cineverse",
    };
  }
}

export default async function MovieDetailPage({ params }) {
  let m;

  try {
    m = await tmdb.movieDetails(params.id);
  } catch {
    notFound();
  }

  const backdrop = tmdbImage(m.backdrop_path, "original");
  const poster = tmdbImage(m.poster_path, "w500");

  const cast = m.credits?.cast?.slice(0, 8) || [];

  const director = m.credits?.crew?.find(
    (c) => c.job === "Director"
  );

  const trailer = findTrailer(m.videos);

  const cert = findCertification(m.release_dates);

  const shots = (m.images?.backdrops || [])
    .filter((x) => x.file_path)
    .slice(0, 8);

  return (
    <div className="detail-shell">
      {/* HERO */}
      <section className="detail-hero">
        <div className="detail-backdrop">
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          )}
        </div>

        <div className="detail-wash" />

        <div className="detail-content">
          {/* POSTER */}
          <Reveal className="detail-poster">
            {poster && (
              <Image
                src={poster}
                alt={`${m.title} poster`}
                fill
                sizes="300px"
                priority
              />
            )}
          </Reveal>

          {/* MOVIE INFO */}
          <Reveal className="detail-copy">
            <p className="eyebrow">Movie profile</p>

            <h1>{m.title}</h1>

            {m.tagline && (
              <p className="detail-tagline">
                {m.tagline}
              </p>
            )}

            <div className="detail-stats">
              <RatingBadge
                value={m.vote_average}
                size="lg"
              />

              <span>
                <Calendar
                  size={14}
                  className="inline mr-1"
                />
                {formatYear(m.release_date)}
              </span>

              {m.runtime && (
                <span>
                  <Clock
                    size={14}
                    className="inline mr-1"
                  />
                  {formatRuntime(m.runtime)}
                </span>
              )}

              {cert && (
                <span className="pill">
                  {cert}
                </span>
              )}
            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-2 mt-5">
              {m.genres?.map((genre) => (
                <span
                  className="pill"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* OVERVIEW */}
            {m.overview && (
              <p>
                {m.overview}
              </p>
            )}

            {/* DIRECTOR */}
            {director && (
              <p className="!mt-4 !text-xs">
                Directed by{" "}
                <strong className="text-[var(--text)]">
                  {director.name}
                </strong>
              </p>
            )}

            {/* ACTIONS */}
            <div className="detail-actions">
              {trailer && (
                <TrailerButton youtubeKey={trailer} />
              )}

              <SaveButton
                movieId={m.id}
                variant="button"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      {shots.length > 0 && (
        <section className="gallery">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <Camera
                  size={13}
                  className="inline mr-1"
                />
                Visual gallery
              </p>

              <h2>Behind the frames</h2>
            </div>

            <span className="section-count">
              {shots.length} stills
            </span>
          </div>

          <div className="gallery-grid">
            {shots.map((shot, index) => (
              <div
                className="gallery-item"
                key={shot.file_path}
              >
                <Image
                  src={tmdbImage(
                    shot.file_path,
                    "w780"
                  )}
                  alt={`${m.title} still ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CAST */}
      {cast.length > 0 && (
        <section className="cast-section">
          <p className="eyebrow">The cast</p>

          <h2 className="text-2xl font-semibold">
            Faces behind the story
          </h2>

          <div className="cast-grid mt-6">
            {cast.map((person) => (
              <div
                key={
                  person.credit_id ||
                  person.cast_id ||
                  person.id
                }
              >
                <div className="cast-photo">
                  {person.profile_path && (
                    <Image
                      src={tmdbImage(
                        person.profile_path,
                        "w185"
                      )}
                      alt={person.name}
                      fill
                      sizes="120px"
                    />
                  )}
                </div>

                <div className="cast-name">
                  {person.name}
                </div>

                <div className="cast-role">
                  {person.character}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SIMILAR MOVIES */}
      <SectionGrid
        title="More like this"
        movies={m.similar?.results || []}
        eyebrow="You may also like"
      />
    </div>
  );
}
