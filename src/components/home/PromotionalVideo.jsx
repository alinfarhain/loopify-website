import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router";

const VIDEO_URL =
  "/videos/loopify-promo.mp4";

const POSTER_URL =
  "/images/loopify-promo-poster.webp";

export default function PromotionalVideo() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [hasVideoError, setHasVideoError] =
    useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const reducedMotionQuery =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    function applyMotionPreference() {
      if (reducedMotionQuery.matches) {
        video.pause();
        setIsPlaying(false);
        return;
      }

      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    applyMotionPreference();

    if (
      reducedMotionQuery.addEventListener
    ) {
      reducedMotionQuery.addEventListener(
        "change",
        applyMotionPreference,
      );
    } else {
      reducedMotionQuery.addListener(
        applyMotionPreference,
      );
    }

    return () => {
      if (
        reducedMotionQuery
          .removeEventListener
      ) {
        reducedMotionQuery.removeEventListener(
          "change",
          applyMotionPreference,
        );
      } else {
        reducedMotionQuery.removeListener(
          applyMotionPreference,
        );
      }
    };
  }, []);

  async function toggleVideo() {
    const video = videoRef.current;

    if (!video || hasVideoError) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.error(
          "Unable to play promotional video:",
          error,
        );
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <section
      className="home-promo-section page-section"
      aria-labelledby="home-promo-heading"
    >
      <div className="home-promo-player-area">
        <span
          className="home-promo-sticker home-promo-sticker-top"
          aria-hidden="true"
        >
          NEW DROP
        </span>

        <span
          className="home-promo-decoration home-promo-decoration-one"
          aria-hidden="true"
        >
          ✦
        </span>

        <span
          className="home-promo-decoration home-promo-decoration-two"
          aria-hidden="true"
        >
          ♡
        </span>

        <div className="computer-window home-promo-window">
          <div className="window-title-bar">
            <span>
              loopify_promo_video.exe
            </span>

            <div aria-hidden="true">
              <span>—</span>
              <span>□</span>
              <span>×</span>
            </div>
          </div>

          <div className="home-promo-player-body">
            <div className="home-promo-phone-frame">
              {!hasVideoError ? (
                <>
                  <video
                    ref={videoRef}
                    className="home-promo-video"
                    width="607"
                    height="1077"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={POSTER_URL}
                    aria-label="Loopify Charmies promotional video"
                    aria-describedby="home-promo-description"
                    onPlay={() =>
                      setIsPlaying(true)
                    }
                    onPause={() =>
                      setIsPlaying(false)
                    }
                    onError={() =>
                      setHasVideoError(true)
                    }
                  >
                    <source
                      src={VIDEO_URL}
                      type="video/mp4"
                    />

                    Your browser does not support
                    HTML video.
                  </video>

                  <button
                    className="home-promo-play-button"
                    type="button"
                    aria-label={
                      isPlaying
                        ? "Pause promotional video"
                        : "Play promotional video"
                    }
                    onClick={toggleVideo}
                  >
                    <span aria-hidden="true">
                      {isPlaying ? "Ⅱ" : "▶"}
                    </span>

                    <strong>
                      {isPlaying
                        ? "Pause"
                        : "Play"}
                    </strong>
                  </button>
                </>
              ) : (
                <div className="home-promo-error">
                  <span aria-hidden="true">
                    !
                  </span>

                  <strong>
                    Video unavailable
                  </strong>

                  <p>
                    The promotional video could
                    not be loaded.
                  </p>

                  <a
                    className="button button-secondary"
                    href="https://www.instagram.com/loopify_charmies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Instagram ↗
                  </a>
                </div>
              )}

              <span className="home-promo-video-size">
                607 × 1077
              </span>
            </div>

            <div className="home-promo-player-status">
              <div>
                <span
                  className="home-promo-live-dot"
                  aria-hidden="true"
                />

                <strong>
                  NOW PLAYING
                </strong>
              </div>

              <span>
                LOOPIFY_PROMO_01
              </span>
            </div>
          </div>
        </div>

        <span
          className="home-promo-sticker home-promo-sticker-bottom"
          aria-hidden="true"
        >
          PRESS PLAY
        </span>
      </div>

      <div className="home-promo-copy">
        <p className="eyebrow">
          WATCH_THE_LOOP.EXE
        </p>

        <h2 id="home-promo-heading">
          See the mystery come to life
        </h2>

        <p
          id="home-promo-description"
          className="home-promo-description"
        >
          Watch the Loopify experience—from the
          cyber-Y2K packaging to the mystery reveal.
          One box holds one surprise phone charm,
          selected from the regular collections with
          a chance to discover the secret file.
        </p>

        <div className="home-promo-highlight">
          <span aria-hidden="true">
            ?
          </span>

          <div>
            <strong>
              Which collection will choose you?
            </strong>

            <p>
              HyperBloomz, CosmicGlitz,
              AquaSurfz, or the classified
              HaloWhimpz secret charm.
            </p>
          </div>
        </div>

        <div className="home-promo-fact-grid">
          <article>
            <span>RM7</span>
            <strong>Per blind box</strong>
          </article>

          <article>
            <span>3</span>
            <strong>Regular collections</strong>
          </article>

          <article>
            <span>?</span>
            <strong>Secret file chance</strong>
          </article>
        </div>

        <div className="home-promo-actions">
          <Link
            className="button button-primary"
            to="/shop"
          >
            Get a Blind Box
          </Link>

          <Link
            className="button button-secondary"
            to="/collections"
          >
            Explore Collections
          </Link>
        </div>

        <p className="home-promo-note">
          The promotional video is muted during
          automatic playback. Use the play button to
          pause or resume it.
        </p>
      </div>
    </section>
  );
}