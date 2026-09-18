import React from "react";
import ProcessBg from "../assets/processbg.png";

const process = [
  {
    id: 1,
    num: "01",
    title: "Discovery Call",
    desc: "We start every web development project with a detailed discovery call to understand your business goals, target audience, and website requirements — so the final product actually solves real problems, not just looks good.",
  },
  {
    id: 2,
    num: "02",
    title: "Design",
    desc: "Our team creates clean, modern, custom website designs tailored to your brand identity, not a generic template. Every layout is planned with user experience, mobile responsiveness, and conversion in mind.",
  },
  {
    id: 3,
    num: "03",
    title: "Development",
    desc: "We build your website or web app using clean, scalable code — React.js and Tailwind CSS for custom sites and web apps, or Shopify/WordPress for stores and content-managed websites — optimized for speed, SEO, and performance from the ground up.",
  },
  {
    id: 4,
    num: "04",
    title: "Launch & Support",
    desc: "We handle a smooth website launch and stay available afterward for updates, fixes, and ongoing support, so your site keeps running reliably long after go-live.",
  },
];

const Process = () => {
  return (
    <section
      id="process"
      className="
        scroll-mt-21.25
        bg-cover
        bg-center
        bg-no-repeat
        px-5
        py-12
        sm:px-8
        sm:py-14
        md:px-10
        md:py-16
      "
      style={{ backgroundImage: `url(${ProcessBg})` }}
    >
      {/* ================= HEADER ================= */}
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
          OUR PROCESS
        </div>

        <h2
          className="
            max-w-4xl
            font-heading
            text-3xl
            font-bold
            leading-tight
            text-brand-light
            sm:text-4xl
            md:text-5xl
          "
        >
          Simple & Transparent Web Development Process
        </h2>

        <p
          className="
            mt-4
            max-w-2xl
            font-body
            text-sm
            leading-6
            text-brand-light/70
            sm:text-base
            sm:leading-7
          "
        >
          From idea to launch, we follow a clear, collaborative web design and
          development process — no confusion, no hidden steps, no stress. Every
          project we build with React.js, Tailwind CSS, Shopify, or WordPress
          follows the same structured, transparent workflow.
        </p>
      </div>

      {/* ================= PROCESS ================= */}
      <div className="mx-auto max-w-6xl">
        {/* DESKTOP TIMELINE */}
        <div className="relative hidden lg:block">
          {/* MAIN LINE */}
          <div
            className="
              absolute
              left-0
              right-0
              top-6
              h-px
              bg-brand-amber/30
            "
          />

          {/* STEPS */}
          <div className="grid grid-cols-4 gap-6">
            {process.map((item) => (
              <div
                key={item.id}
                className="
                  group
                  relative
                  cursor-pointer
                "
              >
                {/* NUMBER */}
                <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-amber bg-brand-dark font-body text-xs font-black text-brand-amber transition-all duration-300 group-hover:bg-brand-amber group-hover:text-brand-dark group-hover:shadow-[0_0_25px_rgba(232,89,12,0.35)]">
                  {item.num}
                </div>

                {/* CONTENT */}
                <div
                  className="
                    border-t
                    border-brand-light/10
                    pt-4
                    transition-all
                    duration-300
                    group-hover:border-brand-amber/50
                  "
                >
                  <h3
                    className="
                      mb-2
                      font-heading
                      text-xl
                      font-bold
                      text-brand-light
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      font-body
                      text-xs
                      leading-6
                      text-brand-light/60
                    "
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABLET */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:hidden">
          {process.map((item, index) => (
            <div
              key={item.id}
              className="
                group
                relative
                cursor-pointer
                border-l
                border-brand-amber/30
                pl-5
              "
            >
              {/* NUMBER */}
              <div
                className="
                  absolute
                  -left-4.25
                  top-0
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-brand-amber
                  bg-brand-dark
                  font-body
                  text-[10px]
                  font-black
                  text-brand-amber
                  transition-all
                  duration-300
                  group-hover:bg-brand-amber
                  group-hover:text-brand-dark
                "
              >
                {item.num}
              </div>

              <div className="pt-1">
                <h3
                  className="
                    mb-2
                    font-heading
                    text-xl
                    font-bold
                    text-brand-light
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    font-body
                    text-xs
                    leading-6
                    text-brand-light/60
                  "
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="relative space-y-7 sm:hidden">
          {/* VERTICAL LINE */}
          <div
            className="
              absolute
              bottom-3
              left-3.75
              top-3
              w-px
              bg-brand-amber/30
            "
          />

          {process.map((item) => (
            <div
              key={item.id}
              className="
                group
                relative
                flex
                gap-5
                cursor-pointer
              "
            >
              {/* NUMBER */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-brand-amber
                  bg-brand-dark
                  font-body
                  text-[10px]
                  font-black
                  text-brand-amber
                  transition-all
                  duration-300
                  group-hover:bg-brand-amber
                  group-hover:text-brand-dark
                "
              >
                {item.num}
              </div>

              {/* CONTENT */}
              <div className="flex-1 pb-1">
                <h3
                  className="
                    mb-2
                    font-heading
                    text-lg
                    font-bold
                    leading-tight
                    text-brand-light
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    font-body
                    text-[11px]
                    leading-5
                    text-brand-light/60
                  "
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
