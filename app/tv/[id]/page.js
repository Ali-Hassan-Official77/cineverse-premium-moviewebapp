
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, Camera } from "lucide-react";

import {
  tmdb,
  tmdbImage,
  mediaTitle,
} from "@/lib/tmdb";

import { formatRuntime, findTrailer } from "@/lib/utils";

import SectionGrid from "@/components/SectionGrid";
import RatingBadge from "@/components/RatingBadge";
import TrailerButton from "@/components/TrailerButton";
import SaveButton from "@/components/SaveButton";
import Reveal from "@/components/Reveal";

export const revalidate = 1800;

export async function generateMetadata({ params }) {
  try {
    const s = await tmdb.tvDetails(params.id);

    return {
      title: `${mediaTitle(s)} — Cineverse`,
      description: s.overview?.slice(0, 155),
    };
  } catch {
    return {
      title: "Series — Cineverse",
    };
  }
}

export default async function TVDetailPage({ params }) {
  let s;

  try {
    s = await tmdb.tvDetails(params.id);
  } catch {
    notFound();
  }

  const title = mediaTitle(s);

  const backdrop = tmdbImage(
    s.backdrop_path,
    "original"
  );

  const poster = tmdbImage(
    s.poster_path,
    "w500"
  );

  const cast =
    s.credits?.cast?.slice(0, 8) || [];

  const trailer = findTrailer(s.videos);

  const shots = (
    s.images?.backdrops || []
  )
    .filter((image) => image.file_path)
    .slice(0, 8);

  const firstAirYear =
    String(s.first_air_date || "").slice(0, 4) || "—";

  const runtime = s.episode_run_time?.[0]
    ? formatRuntime(s.episode_run_time[0])
    : "Episode runtime";

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
                alt={`${title} poster`}
                fill
                priority
                sizes="300px"
              />
            )}
          </Reveal>

          {/* SERIES INFORMATION */}
          <Reveal className="detail-copy">

            <p className="eyebrow">
              Series profile
            </p>

            <h1>{title}</h1>

            {s.tagline && (
              <p className="detail-tagline">
                {s.tagline}
              </p>
            )}

            {/* STATS */}
            <div className="detail-stats">

              <RatingBadge
                value={s.vote_average}
                size="lg"
              />

              <span>
                <Calendar
                  size={14}
                  className="inline mr-1"
                />
                {firstAirYear}
              </span>

              <span>
                <Clock
                  size={14}
                  className="inline mr-1"
                />
                {runtime}
              </span>

            </div>

            {/* GENRES */}
            <div className="flex flex-wrap gap-2 mt-5">
              {s.genres?.map((genre) => (
                <span
                  className="pill"
                  key={genre.id}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* OVERVIEW */}
            {s.overview && (
              <p>{s.overview}</p>
            )}

            {/* ACTIONS */}
            <div className="detail-actions">

              {trailer && (
                <TrailerButton
                  youtubeKey={trailer}
                />
              )}

              <SaveButton
                movieId={s.id}
                variant="button"
              />

            </div>

          </Reveal>
        </div>
      </section>

      {/* VISUAL GALLERY */}
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

              <h2>
                Behind the frames
              </h2>
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
                  alt={`${title} still ${index + 1}`}
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

          <p className="eyebrow">
            The cast
          </p>

          <h2 className="text-2xl font-semibold">
            Faces behind the story
          </h2>

          <div className="cast-grid mt-6">

            {cast.map((person) => (
              <div
                key={
                  person.credit_id ||
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

      {/* SIMILAR SERIES */}
      <SectionGrid
        title="More series to explore"
        movies={s.similar?.results || []}
        eyebrow="You may also like"
      />

    </div>
  );
}
