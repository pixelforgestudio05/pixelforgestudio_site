import React, { useEffect, useState } from "react";
import { CgArrowTopRight } from "react-icons/cg";
import Project_1 from "../assets/work/1.png";
import Project_2 from "../assets/work/2.png";
import Project_3 from "../assets/work/3.png";
import Project_4 from "../assets/work/4.png";
import Project_5 from "../assets/work/5.png";
import Project_6 from "../assets/work/6.png";
import Project_7 from "../assets/work/7.png";

const projects = [
  {
    id: 1,
    name: "Developer Portfolio Website",
    description:
      "A sleek, fully responsive personal portfolio built from scratch, featuring an animated hero section, service breakdown, experience timeline, and a live project showcase — designed to convert visitors into clients.",
    image: Project_1,
    link: "https://muhammadfarhandev.netlify.app",
  },
  {
    id: 2,
    name: "X (Twitter) Clone",
    description:
      "A pixel-accurate frontend clone of the X platform, recreating the feed, sidebar navigation, trending topics panel, and 'Who to Follow' suggestions with a polished dark theme and precise layout structuring.",
    image: Project_2,
    link: "https://xclonebymfarhan.netlify.app",
  },

  {
    id: 3,
    name: "UX Gazette — Blog & Magazine Website",
    description:
      "A structured editorial-style blog and magazine website built on WordPress, featuring category filtering, trending articles, and a fully responsive layout designed for fast content discovery and easy content management.",
    image: Project_3,
    link: "https://uxgazette.com",
  },
  {
    id: 4,
    name: "Browser-Based Audio Recorder",
    description:
      "An interactive audio recording web app built with vanilla JavaScript, allowing users to record, play back, and download audio directly in the browser — a hands-on demonstration of working with browser media APIs.",
    image: Project_4,
    link: "https://muhammad-farhan-dev.github.io/Audio-Recorder",
  },
  {
    id: 5,
    name: "3D Interactive Portfolio Website",
    description:
      "A visually striking portfolio website featuring 3D visual elements and interactive animations built with HTML, CSS, and JavaScript, pushing beyond flat design to create a more immersive browsing experience.",
    image: Project_5,
    link: "https://muhammad-farhan-dev.github.io/3d-portfolio-website",
  },
  {
    id: 6,
    name: "DO Technologies — Corporate Website",
    description:
      "A professional corporate website built for a Dubai & Pakistan-based technology company, developed with React.js and Tailwind CSS during an internship, showcasing their web, app, and digital marketing services with a clean, modern layout.",
    image: Project_6,
    link: "https://dotech.pk",
  },
  {
    id: 7,
    name: "KHC Cleaning Services — Dubai",
    description:
      "A professional service website built for a Dubai-based cleaning company during an internship at DO Technologies, showcasing office, home, and commercial cleaning plans with a clean layout and a direct WhatsApp booking flow.",
    image: Project_7,
    link: "https://khcuae.com",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);

  const gap = 20;

  /* =========================================================
     RESPONSIVE CARD COUNT
  ========================================================= */

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateCards();

    window.addEventListener("resize", updateCards);

    return () => {
      window.removeEventListener("resize", updateCards);
    };
  }, []);

  /* =========================================================
     CAROUSEL WIDTH
  ========================================================= */

  useEffect(() => {
    const updateWidth = () => {
      const element = document.getElementById("work-carousel");

      if (element) {
        setContainerWidth(element.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  /* =========================================================
     CARD WIDTH
  ========================================================= */

  const cardWidth =
    visibleCards > 0
      ? (containerWidth - gap * (visibleCards - 1)) / visibleCards
      : 280;

  /* =========================================================
     AUTO SLIDE
  ========================================================= */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* =========================================================
     INFINITE LOOP
  ========================================================= */

  useEffect(() => {
    if (currentIndex >= projects.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  /* =========================================================
     TRANSLATE
  ========================================================= */

  const translateX = currentIndex * (cardWidth + gap);

  return (
    <section
      id="work"
      className="
        overflow-hidden
        bg-brand-dark
        p-6
        sm:p-8
        md:p-10
      "
    >
      {/* =====================================================
          SECTION HEADING
      ===================================================== */}

      <div className="mb-10 md:mb-12">
        <div
          className="
            mb-2
            w-fit
            font-body
            text-xl
            font-black
            uppercase
            tracking-[0.18em]
            text-transparent
            [-webkit-text-stroke:1px_var(--color-brand-amber)]
            sm:text-2xl
          "
        >
          OUR WORK
        </div>

        <h2
          className="
            font-heading
            text-3xl
            font-bold
            leading-tight
            text-brand-light
            sm:text-4xl
            md:text-5xl
          "
        >
          What We&apos;ve Built
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            font-body
            text-sm
            leading-7
            text-brand-light/70
            sm:text-base
            md:text-[1.05rem]
          "
        >
          A few examples of what we&apos;ve built — real client projects will be
          added here soon as we continue growing our portfolio.
        </p>
      </div>

      {/* =====================================================
          CAROUSEL
      ===================================================== */}

      <div
        id="work-carousel"
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="
            flex
            w-max
            items-stretch
            transition-transform
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            gap: `${gap}px`,
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {/* DUPLICATED PROJECTS */}
          {[...projects, ...projects].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              style={{
                width: `${cardWidth}px`,
              }}
              className="
                  group
                  shrink-0
                  cursor-pointer
                  perspective-distant
                "
            >
              {/* =================================================
                    CARD
                ================================================= */}

              <div
                className="
                    relative
                    h-97.5
                    w-full
                    transform-3d
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:transform-[rotateY(180deg)]
                    sm:h-102.5
                    lg:h-107.5
                  "
              >
                {/* =================================================
                      FRONT
                  ================================================= */}

                <div
                  className="
                      absolute
                      inset-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-brand-light/10
                      bg-[#1B1E24]
                      shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                      backface-hidden
                    "
                >
                  {/* IMAGE */}

                  <img
                    src={project.image}
                    alt={project.name}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                  />

                  {/* IMAGE OVERLAY */}

                  <div
                    className="
                        absolute
                        inset-0
                        bg-linear-to-b
                        from-brand-dark/20
                        via-transparent
                        to-brand-dark/85
                      "
                  />

                  {/* TOP TITLE */}

                  <div
                    className="
                        absolute
                        left-0
                        top-0
                        w-full
                        p-4
                        sm:p-5
                      "
                  >
                    <span
                      className="
                          inline-flex
                          max-w-full
                          items-center
                          rounded-full
                          border-2
                          border-brand-amber
                          bg-brand-dark/90
                          px-3.5
                          py-2
                          font-body
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.08em]
                          text-brand-light
                          shadow-[0_0_20px_rgba(232,89,12,0.12)]
                          backdrop-blur-md
                          transition-all
                          duration-300
                          group-hover:bg-brand-amber
                          group-hover:text-brand-dark
                          sm:px-4
                          sm:py-2.5
                          sm:text-[10px]
                          lg:text-xs
                        "
                    >
                      <span className="truncate">{project.name}</span>
                    </span>
                  </div>

                  {/* PROJECT NUMBER */}

                  <div
                    className="
                        absolute
                        bottom-4
                        right-4
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-brand-light/20
                        bg-brand-dark/60
                        font-body
                        text-[10px]
                        font-bold
                        text-brand-light/70
                        backdrop-blur-md
                      "
                  >
                    {String(project.id).padStart(2, "0")}
                  </div>
                </div>

                {/* =================================================
                      BACK
                  ================================================= */}

                <div
                  className="
                      absolute
                      inset-0
                      flex
                      h-full
                      w-full
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border-2
                      border-brand-amber
                      bg-brand-dark
                      p-4
                      backface-hidden
                      transform-[rotateY(180deg)]
                      sm:p-5
                      lg:p-6
                    "
                >
                  {/* TOP LINE */}

                  <div
                    className="
                        mb-4
                        h-px
                        w-full
                        shrink-0
                        bg-brand-amber/30
                        sm:mb-5
                      "
                  />

                  {/* TITLE */}

                  <h3
                    className="
                        shrink-0
                        font-heading
                        text-xl
                        font-bold
                        leading-tight
                        text-brand-amber
                        sm:text-2xl
                        lg:text-3xl
                      "
                  >
                    {project.name}
                  </h3>

                  {/* DESCRIPTION */}

                  <div className="mt-3 min-h-0 flex-1">
                    <p
                      className="
                          font-body
                          text-xs
                          leading-5
                          text-brand-light/65
                          sm:text-sm
                          sm:leading-6
                        "
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* BOTTOM AREA */}

                  <div
                    className="
                        relative
                        z-10
                        mt-4
                        shrink-0
                        sm:mt-5
                      "
                  >
                    <div
                      className="
                          mb-3
                          h-px
                          w-10
                          bg-brand-amber
                          sm:mb-4
                          sm:w-12
                        "
                    />

                    {/* VIEW PROJECT */}

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="OPEN"
                      className="
                          group/link
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border-2
                          border-brand-amber
                          px-3.5
                          py-2
                          font-body
                          text-[10px]
                          font-extrabold
                          uppercase
                          tracking-[0.08em]
                          text-brand-amber
                          transition-all
                          duration-300
                          hover:bg-brand-amber
                          hover:text-brand-dark
                          hover:shadow-[0_0_22px_rgba(232,89,12,0.25)]
                          sm:px-4
                          sm:py-2.5
                          sm:text-xs
                        "
                    >
                      View Project
                      <CgArrowTopRight
                        className="
                            text-sm
                            transition-transform
                            duration-300
                            group-hover/link:translate-x-1
                            sm:text-base
                          "
                      />
                    </a>
                  </div>

                  {/* LARGE NUMBER */}

                  <span
                    className="
                        pointer-events-none
                        absolute
                        bottom-3
                        right-4
                        font-body
                        text-[3.5rem]
                        font-black
                        leading-none
                        text-brand-amber/10
                        sm:bottom-4
                        sm:right-5
                        sm:text-[4rem]
                      "
                  >
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
