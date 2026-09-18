import React, { useState } from "react";
import { FaReact, FaShopify, FaWordpress } from "react-icons/fa6";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoMdArrowRoundForward } from "react-icons/io";

const carddata = [
  {
    id: 1,
    icon: <FaReact />,
    title: "Web Development",
    desc: "We build modern, fast, and fully responsive websites and web apps using React.js & Tailwind CSS — designed to look great, load quickly, and turn visitors into customers.",
  },
  {
    id: 2,
    icon: <FaShopify />,
    title: "Shopify Store Development",
    desc: "We design and build high-converting Shopify stores from the ground up, from product setup to a smooth checkout experience, so your store is ready to sell from day one.",
  },
  {
    id: 3,
    icon: <FaWordpress />,
    title: "WordPress Websites",
    desc: "We create flexible, easy to manage WordPress websites for your brand or business, giving you full control to update content anytime without touching a single line of code.",
  },
  {
    id: 4,
    icon: <MdOutlineOndemandVideo />,
    title: "Video Editing",
    desc: "We produce engaging, professionally edited videos that bring your brand to life across social media, ads, and marketing campaigns — content that keeps your audience watching.",
  },
];

const Services = () => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardClick = (id) => {
    if (window.innerWidth < 1024) {
      setFlippedCard((prev) => (prev === id ? null : id));
    }
  };

  return (
    <section
      id="services"
      className="
        w-full
        bg-brand-dark
        px-5
        py-16
        sm:px-8
        md:px-10
        lg:px-10
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= SECTION HEADING ================= */}

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
            SERVICES
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
            What We Do
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
            We craft modern, high-performance websites, web apps and digital
            content to help your brand stand out and grow.
          </p>
        </div>

        {/* ================= SERVICES GRID ================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {carddata.map((card) => {
            const isFlipped = flippedCard === card.id;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className="
                  group
                  h-82.5
                  w-full
                  cursor-pointer
                  perspective-distant
                  sm:h-87.5
                  md:h-90
                  lg:cursor-pointer
                "
              >
                {/* ================= FLIP INNER ================= */}

                <div
                  className={`
                    relative
                    h-full
                    w-full
                    rounded-2xl
                    transition-transform
                    duration-700
                    ease-[cubic-bezier(0.4,0.2,0.2,1)]
                    transform-3d

                    lg:group-hover:transform-[rotateY(180deg)]

                    ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
                  `}
                >
                  {/* ================================================= */}
                  {/* FRONT SIDE */}
                  {/* ================================================= */}

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
                      border
                      border-brand-light/10
                      bg-brand-light/5
                      p-5
                      backdrop-blur-xl
                      backface-hidden
                      sm:p-6
                    "
                  >
                    {/* Glass Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-40
                        w-40
                        rounded-full
                        bg-brand-amber/5
                        blur-3xl
                      "
                    />

                    {/* ================= TOP ROW ================= */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      {/* SERVICES */}

                      <span
                        className="
                          shrink-0
                          font-body
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-transparent
                          [-webkit-text-stroke:0.8px_var(--color-brand-amber)]
                          sm:text-xs
                        "
                      >
                        SERVICES
                      </span>

                      {/* PIXELFORGE STUDIO */}

                      <span
                        className="
                          whitespace-nowrap
                          font-body
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.06em]
                          text-brand-light/40
                          sm:text-[9px]
                          sm:tracking-[0.08em]
                        "
                      >
                        PIXELFORGE STUDIO
                      </span>
                    </div>

                    {/* ================= NUMBER ================= */}

                    <div
                      className="
                        relative
                        z-10
                        mt-5
                        font-heading
                        text-4xl
                        font-bold
                        leading-none
                        text-transparent
                        [-webkit-text-stroke:1px_var(--color-brand-amber)]
                      "
                    >
                      0{card.id}
                    </div>

                    {/* ================= ICON ================= */}

                    <div
                      className="
                        relative
                        z-10
                        mt-6
                        flex
                        h-16
                        w-16
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-brand-amber/30
                        bg-brand-amber/10
                        text-4xl
                        text-brand-amber
                        backdrop-blur-md
                        transition-all
                        duration-300
                        group-hover:border-brand-amber/60
                        group-hover:bg-brand-amber/15
                        group-hover:shadow-[0_0_25px_rgba(232,89,12,0.12)]
                      "
                    >
                      {card.icon}
                    </div>

                    {/* ================= TITLE ================= */}

                    <h3
                      className="
                        relative
                        z-10
                        mt-6
                        max-w-62.5
                        font-heading
                        text-xl
                        font-bold
                        leading-tight
                        text-brand-light
                        sm:text-2xl
                      "
                    >
                      {card.title}
                    </h3>

                    {/* Amber Line */}

                    <div
                      className="
                        relative
                        z-10
                        mt-4
                        h-0.5
                        w-12
                        shrink-0
                        rounded-full
                        bg-brand-amber
                        transition-all
                        duration-300
                        group-hover:w-20
                      "
                    />

                    {/* Bottom Hint */}

                    <div
                      className="
                        relative
                        z-10
                        mt-auto
                        flex
                        items-center
                        justify-between
                        pt-4
                        font-body
                        text-xs
                        font-semibold
                        uppercase
                        tracking-wider
                        text-brand-light/40
                      "
                    >
                      <span className="lg:hidden">Tap to explore</span>

                      <span className="hidden lg:block">Hover to explore</span>

                      <IoMdArrowRoundForward
                        className="
                          text-lg
                          text-brand-amber
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* BACK SIDE */}
                  {/* ================================================= */}

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
                      border
                      border-brand-amber/50
                      bg-brand-amber/15
                      p-5
                      backdrop-blur-xl
                      shadow-[inset_0_1px_0_rgba(250,247,242,0.12),0_0_35px_rgba(232,89,12,0.10)]
                      backface-hidden
                      transform-[rotateY(180deg)]
                      sm:p-6
                    "
                  >
                    {/* Amber Glass Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-48
                        w-48
                        rounded-full
                        bg-brand-amber/25
                        blur-3xl
                      "
                    />

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -bottom-20
                        -left-20
                        h-40
                        w-40
                        rounded-full
                        bg-brand-amber/15
                        blur-3xl
                      "
                    />

                    {/* ================= TOP ROW ================= */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      {/* SERVICES */}

                      <span
                        className="
                          shrink-0
                          font-body
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-brand-light
                          sm:text-xs
                        "
                      >
                        SERVICES
                      </span>

                      {/* PIXELFORGE STUDIO */}

                      <span
                        className="
                          whitespace-nowrap
                          font-body
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.06em]
                          text-brand-light/65
                          sm:text-[9px]
                          sm:tracking-[0.08em]
                        "
                      >
                        PIXELFORGE STUDIO
                      </span>
                    </div>

                    {/* ================= NUMBER ================= */}

                    <div
                      className="
                        relative
                        z-10
                        mt-5
                        shrink-0
                        font-heading
                        text-3xl
                        font-bold
                        leading-none
                        text-transparent
                        [-webkit-text-stroke:1px_var(--color-brand-light)]
                        sm:text-4xl
                      "
                    >
                      0{card.id}
                    </div>

                    {/* ================= TITLE ================= */}

                    <h3
                      className="
                        relative
                        z-10
                        mt-5
                        shrink-0
                        font-heading
                        text-lg
                        font-bold
                        leading-snug
                        text-brand-light
                        sm:text-xl
                      "
                    >
                      {card.title}
                    </h3>

                    {/* ================= DESCRIPTION ================= */}

                    <p
                      className="
                        relative
                        z-10
                        mt-3
                        max-h-26.25
                        overflow-hidden
                        font-body
                        text-[11px]
                        leading-5
                        text-brand-light/80
                        sm:text-xs
                        sm:leading-5
                      "
                    >
                      {card.desc}
                    </p>

                    {/* ================= BUTTON ================= */}

                    <a
                      href="#contact"
                      onClick={(e) => e.stopPropagation()}
                      className="
                        group/btn
                        relative
                        z-10
                        mt-auto
                        flex
                        w-fit
                        shrink-0
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
                        text-[0.75rem]
                        font-extrabold
                        text-brand-dark
                        transition-all
                        duration-300
                        ease-in-out
                        hover:bg-transparent
                        hover:text-brand-light
                        hover:shadow-[0_0_22px_rgba(232,89,12,0.30)]
                      "
                    >
                      <span>Discuss This Service</span>

                      <IoMdArrowRoundForward
                        className="
                          text-lg
                          transition-transform
                          duration-300
                          group-hover/btn:translate-x-1
                        "
                      />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
