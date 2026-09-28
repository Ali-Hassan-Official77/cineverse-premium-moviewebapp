"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  Star,
} from "lucide-react";

import {
  tmdbImage,
  mediaDate,
  mediaTitle,
} from "@/lib/tmdb";

import { formatRating } from "@/lib/utils";

export default function Hero({ movies = [] }) {
  const items = useMemo(
    () => movies.filter(Boolean).slice(0, 7),
    [movies]
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const movie = items[index];

  /* --------------------------------
     AUTO SLIDER
  -------------------------------- */

  useEffect(() => {
    if (
      items.length < 2 ||
      reduce ||
      paused
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) =>
        current === items.length - 1
          ? 0
          : current + 1
      );
    }, 6500);

    return () => window.clearInterval(timer);
  }, [items.length, paused, reduce]);

  /* --------------------------------
     SAFETY
  -------------------------------- */

  useEffect(() => {
    if (index >= items.length && items.length > 0) {
      setIndex(0);
    }
  }, [index, items.length]);

  if (!items.length) {
    return (
      <section className="hero hero-empty">
        <div className="hero-inner">
          <div className="hero-skeleton" />
        </div>
      </section>
    );
  }

  const title = mediaTitle(movie);

  const year = String(mediaDate(movie) || "")
    .slice(0, 4);

  const backdrop = tmdbImage(
    movie.backdrop_path || movie.poster_path,
    "original"
  );

  const poster = tmdbImage(
    movie.poster_path || movie.backdrop_path,
    "w780"
  );

  const rating = formatRating(
    movie.vote_average
  );

  const genreCount =
    movie.genre_ids?.length ||
    movie.genres?.length ||
    0;

  const nextSlide = () => {
    setIndex((current) =>
      current === items.length - 1
        ? 0
        : current + 1
    );
  };

  const previousSlide = () => {
    setIndex((current) =>
      current === 0
        ? items.length - 1
        : current - 1
    );
  };

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${movie.id}`}
          className="hero-background"
          initial={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: reduce ? 0.25 : 1.2,
            ease: "easeOut",
          }}
        >
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-background-image"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* cinematic overlays */}
      <div className="hero-vignette" />
      <div className="hero-gradient" />
      <div className="hero-noise" />

      {/* decorative glow */}
      <motion.div
        className="hero-glow"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 35, 0],
                y: [0, -20, 0],
                opacity: [0.45, 0.65, 0.45],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="hero-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${movie.id}`}
            className="hero-content"
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: -16,
                  }
            }
            transition={{
              duration: reduce ? 0.25 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* =================================
                KICKER
            ================================= */}

            <div className="hero-kicker">
              <span className="hero-kicker-icon">
                <Sparkles size={13} />
              </span>

              <span>
                Featured this week
              </span>

              <span className="hero-kicker-line" />
            </div>

            {/* =================================
                HEADING
            ================================= */}

            <h1 className="hero-heading">
              Stories that{" "}
              <span>stay with you.</span>
            </h1>

            {/* =================================
                MOVIE TITLE
            ================================= */}

            <div className="hero-title-row">
              <span className="hero-title-mark" />

              <h2>{title}</h2>
            </div>

            {/* =================================
                DESCRIPTION
            ================================= */}

            <p className="hero-description">
              {movie.overview ||
                `Explore ${title}, one of the titles currently moving through Cineverse.`}
            </p>

            {/* =================================
                META
            ================================= */}

            <div className="hero-meta">
              <span className="hero-rating">
                <Star
                  size={13}
                  fill="currentColor"
                />

                {rating}
              </span>

              {year && (
                <>
                  <span className="hero-meta-dot" />
                  <span>{year}</span>
                </>
              )}

              {genreCount > 0 && (
                <>
                  <span className="hero-meta-dot" />
                  <span>
                    {genreCount}{" "}
                    {genreCount === 1
                      ? "genre"
                      : "genres"}
                  </span>
                </>
              )}
            </div>

            {/* =================================
                ACTIONS
            ================================= */}

            <div className="hero-actions">
              <Link
                href={`/movie/${movie.id}`}
                className="hero-button hero-button-primary"
              >
                <span className="hero-button-icon">
                  <Play
                    size={15}
                    fill="currentColor"
                  />
                </span>

                <span>
                  Explore movie
                </span>

                <ArrowRight size={15} />
              </Link>

              <Link
                href="/genres"
                className="hero-button hero-button-secondary"
              >
                Browse universe
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* =========================================
            POSTER
        ========================================= */}

        <AnimatePresence mode="wait">
          <motion.div
            key={`poster-${movie.id}`}
            className="hero-poster-wrap"
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.94,
                    x: 25,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            exit={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.97,
                    x: -15,
                  }
            }
            transition={{
              duration: reduce ? 0.25 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/movie/${movie.id}`}
              className="hero-poster-link"
              aria-label={`Open ${title}`}
            >
              <div className="hero-poster-frame">
                {/* top decorative line */}
                <div className="hero-poster-line" />

                {poster && (
                  <Image
                    src={poster}
                    alt={`${title} poster`}
                    fill
                    priority={index === 0}
                    sizes="
                      (max-width: 640px) 48vw,
                      (max-width: 1024px) 35vw,
                      390px
                    "
                    className="hero-poster-image"
                  />
                )}

                <div className="hero-poster-shade" />

                {/* rating floating card */}
                <div className="hero-poster-rating">
                  <Star
                    size={12}
                    fill="currentColor"
                  />

                  <span>{rating}</span>
                </div>

                {/* slide counter */}
                <div className="hero-index">
                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <i />

                  <span className="muted">
                    {String(items.length).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* bottom title */}
                <div className="hero-poster-caption">
                  <span>Now featuring</span>
                  <strong>{title}</strong>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================
          CONTROLS
      ========================================= */}

      {items.length > 1 && (
        <div className="hero-controls">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous movie"
            className="hero-control"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="hero-progress">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to slide ${
                  itemIndex + 1
                }`}
                onClick={() =>
                  setIndex(itemIndex)
                }
                className={`hero-progress-item ${
                  itemIndex === index
                    ? "active"
                    : ""
                }`}
              >
                <span />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next movie"
            className="hero-control"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}

      {/* =========================================
          MOBILE SWIPE-LIKE NAV
      ========================================= */}

      <div className="hero-mobile-count">
        <span>
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="hero-mobile-count-line" />

        <span>
          {String(items.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}