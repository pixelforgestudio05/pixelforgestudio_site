import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

import HeroVideo from "../assets/hero-video.mp4";

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-[60vh]
        max-h-[90vh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-brand-dark
      "
    >
      {/* =========================
          BACKGROUND VIDEO
      ========================= */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            opacity-25
          "
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-brand-dark/40" />

        {/* Very Subtle Amber Atmosphere */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(232,89,12,0.06),transparent_60%)]
          "
        />

        {/* Bottom Fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            bg-linear-to-t
            from-brand-dark
            to-transparent
          "
        />
      </div>

      {/* =========================
          SUBTLE AMBER GLOW
      ========================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-1
          h-64
          w-64
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-brand-amber/5
          blur-[100px]

          sm:h-80
          sm:w-80

          md:h-96
          md:w-96
        "
      />

      {/* =========================
          HERO CONTENT
      ========================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-[92%]
          max-w-4xl
          flex-col
          items-center
          justify-center
          py-12
          text-center

          sm:py-14

          md:py-16
        "
      >
        {/* =========================
            EYEBROW
        ========================= */}
        <div
          className="
            mb-4
            flex
            items-center
            gap-2.5
            font-body
            text-[9px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-brand-amber

            sm:mb-5
            sm:text-[10px]

            md:text-xs
          "
        >
          <span className="h-px w-5 bg-brand-amber sm:w-8" />

          <span>WEB DEVELOPMENT & DIGITAL DESIGN AGENCY</span>

          <span className="h-px w-5 bg-brand-amber sm:w-8" />
        </div>

        {/* =========================
            MAIN HEADING
        ========================= */}
        <h1
          className="
            max-w-4xl
            font-heading
            text-[clamp(2.2rem,6vw,4.5rem)]
            font-semibold
            leading-[0.98]
            tracking-tight
            text-brand-light

            sm:leading-[0.95]
          "
        >
          We Forge <span className="text-brand-amber">Digital</span> Experiences
          <br className="hidden sm:block" />
          <span className="text-brand-light"> That Grow Your Business.</span>
        </h1>

        {/* =========================
            DESCRIPTION
        ========================= */}
        <p
          className="
            mt-5
            max-w-xl
            font-body
            text-xs
            font-medium
            leading-5
            tracking-[0.01em]
            text-brand-light/75

            sm:mt-6
            sm:text-sm
            sm:leading-6

            md:text-[15px]
            md:leading-7
          "
        >
          We build modern, SEO-friendly websites, web apps, and Shopify stores
          using React.js and Tailwind CSS — helping small businesses and
          startups grow online.
        </p>

        {/* =========================
            CTA BUTTONS
        ========================= */}
        <div
          className="
            mt-7
            flex
            flex-col
            items-center
            justify-center
            gap-3

            sm:flex-row
          "
        >
          {/* Start a Project */}
          <a
            href="#contact"
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              border-2
              border-brand-amber
              bg-brand-amber
              px-4
              py-2
              font-body
              text-[0.85rem]
              font-extrabold
              text-brand-dark
              transition-all
              duration-300
              ease-in-out
              hover:bg-transparent
              hover:text-brand-amber
              hover:shadow-[0_0_20px_rgba(232,89,12,0.25)]
            "
          >
            <span>Start a Project</span>

            <span
              className="
                text-xl
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <IoMdArrowRoundForward />
            </span>
          </a>

          {/* View Our Work */}
          <a
            href="#work"
            className="
              group
              flex
              items-center
              justify-center
              gap-2
              rounded-full
              border-2
              border-brand-amber
              bg-transparent
              px-4
              py-2
              font-body
              text-[0.85rem]
              font-extrabold
              text-brand-amber
              transition-all
              duration-300
              ease-in-out
              hover:bg-brand-amber
              hover:text-brand-dark
              hover:shadow-[0_0_20px_rgba(232,89,12,0.25)]
            "
          >
            <span>See Our Work</span>

            <span
              className="
                text-xl
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              <IoMdArrowRoundForward />
            </span>
          </a>
        </div>

        {/* =========================
            LOCATION
        ========================= */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-1.5
            font-body
            text-[9px]
            font-medium
            text-brand-light/60

            sm:mt-7
            sm:text-[10px]

            md:text-xs
          "
        >
          <MdLocationOn className="text-sm text-brand-amber" />

          <span>
            Based in Dera Ismail Khan, Pakistan — providing web development
            services to clients worldwide.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
