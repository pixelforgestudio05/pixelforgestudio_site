import React, { useEffect, useState } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const BackToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        fixed
        right-4
        bottom-5
        z-50
        flex
        flex-col
        items-end
        gap-4
        sm:right-5
        md:right-6
      "
    >
      {/* ========================================= */}
      {/* BACK TO TOP */}
      {/* ========================================= */}

      <div
        className={`
          transition-all
          duration-500
          ${
            showBackToTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-4 opacity-0"
          }
        `}
      >
        <button
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="
            group
            flex
            h-10
            w-10
            shrink-0
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-2
            border-brand-amber
            bg-transparent
            text-brand-amber
            transition-colors
            duration-300
            hover:bg-brand-amber
            hover:text-brand-dark
            sm:h-11
            sm:w-11
          "
        >
          <IoMdArrowRoundUp
            className="
              text-lg
              transition-transform
              duration-300
              group-hover:-translate-y-0.5
            "
          />
        </button>
      </div>

      {/* ========================================= */}
      {/* WHATSAPP */}
      {/* ========================================= */}

      <div
        className="
          group
          animate-[whatsappFloat_2.8s_ease-in-out_infinite]
        "
      >
        <a
          href="https://wa.me/923095784729"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Let's Talk on WhatsApp"
          className="
            flex
            h-10
            w-10
            items-center
            justify-start
            overflow-hidden
            rounded-full
            border-2
            border-brand-amber
            bg-transparent
            text-brand-amber
            transition-all
            duration-300
            ease-out

            hover:w-32
            hover:bg-brand-amber
            hover:text-brand-dark
            hover:shadow-[0_0_22px_rgba(232,89,12,0.30)]

            sm:h-11
            sm:w-11
            sm:hover:w-34
          "
        >
          {/* Fixed icon position */}
          <span
            className="
              flex
              h-full
              w-10
              shrink-0
              items-center
              justify-center
              sm:w-11
            "
          >
            <FaWhatsapp
              className="
                text-xl
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </span>

          {/* Text only appears on hover */}
          <span
            className="
              whitespace-nowrap
              font-body
              text-xs
              font-extrabold
              uppercase
              tracking-[0.08em]
              opacity-0
              transition-opacity
              duration-200
              group-hover:opacity-100
            "
          >
            Let&apos;s Talk
          </span>
        </a>
      </div>
    </div>
  );
};

export default BackToTop;
