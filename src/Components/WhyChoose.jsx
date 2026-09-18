import React from "react";
import WhyChooseHero from "../assets/whyusbg.png";
import { FaReact, FaWhatsapp } from "react-icons/fa6";
import { SlEnergy } from "react-icons/sl";
import { HiCurrencyDollar } from "react-icons/hi";

const whyus = [
  {
    id: 1,
    icon: <FaReact />,
    title: "Modern Tech Stack",
    desc: "We build with React.js, Tailwind CSS and industry best practices, giving your website the speed, performance, and scalability that outdated tech simply can't match.",
  },
  {
    id: 2,
    icon: <SlEnergy />,
    title: "Fast Turnaround",
    desc: "We respect your time and deliver on schedule, with clear milestones and no unnecessary delays, so your project launches when you actually need it to.",
  },
  {
    id: 3,
    icon: <FaWhatsapp />,
    title: "Direct Communication",
    desc: "Get quick, clear updates through WhatsApp support, with no middlemen or confusing email chains — you talk directly to the people building your project.",
  },
  {
    id: 4,
    icon: <HiCurrencyDollar />,
    title: "Affordable for Startups",
    desc: "Quality solutions that fit your budget, with pricing and packages designed specifically for startups and small businesses just getting off the ground.",
  },
];

const WhyChoose = () => {
  return (
    <section
      id="whyus"
      className="
        w-full
        bg-cover
        bg-center
        bg-no-repeat
        px-5
        py-8
        sm:px-8
        sm:py-10
        md:px-10
        md:py-14
        lg:px-10
      "
      style={{ backgroundImage: `url(${WhyChooseHero})` }}
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-7xl
          flex-col
          justify-between
          gap-10
          lg:flex-row
          lg:gap-12
        "
      >
        {/* ========================= */}
        {/* CONTENT */}
        {/* ========================= */}

        <div
          className="
            w-full
            px-0
            text-center
            sm:px-2
            md:px-4
            lg:w-1/2
            lg:px-6
            lg:text-left
          "
        >
          <div
            className="
              mb-2
              w-fit
              mx-auto
              font-body
              text-lg
              font-black
              uppercase
              tracking-[0.18em]
              text-transparent
              [-webkit-text-stroke:1px_var(--color-brand-amber)]
              sm:text-xl
              md:text-2xl
              lg:mx-0
            "
          >
            WHY CHOOSE US
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
              lg:text-6xl
            "
          >
            Why Businesses Choose
            <span className="text-brand-amber"> PixelForge</span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              font-body
              text-sm
              leading-7
              text-brand-light/70
              sm:text-base
              md:text-[1.05rem]
              lg:mx-0
            "
          >
            We're not just another agency. We're your long-term tech partner,
            focused on quality, clear communication, and delivering real results
            that help your business grow. From the first conversation to long
            after launch, we stay involved — understanding your goals, building
            with care, and making sure the final product actually works for your
            business, not just for a portfolio.
          </p>
        </div>

        {/* ========================= */}
        {/* CARDS */}
        {/* ========================= */}

        <div
          className="
    grid
    w-full
    grid-cols-1
    gap-x-4
    gap-y-5
    sm:grid-cols-2
    md:gap-x-5
    md:gap-y-6
    lg:w-1/2
    lg:gap-x-4
    lg:gap-y-5
  "
        >
          {whyus.map((e) => {
            return (
              <div
                key={e.id}
                className="
          space-y-2
          rounded-xl
          p-3
          sm:p-4
          md:p-4
        "
              >
                {/* Icon */}
                <div
                  className="
            w-fit
            rounded-lg
            border-2
            border-brand-amber
            p-1.5
            text-2xl
            text-brand-amber
            sm:text-3xl
          "
                >
                  {e.icon}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4
                    className="
              font-heading
              text-base
              font-bold
              leading-tight
              text-brand-light
              sm:text-lg
            "
                  >
                    {e.title}
                  </h4>

                  <p
                    className="
              max-w-sm
              font-body
              text-[11px]
              leading-5
              text-brand-light/70
              sm:text-xs
              sm:leading-5
            "
                  >
                    {e.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
