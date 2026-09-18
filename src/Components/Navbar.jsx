import React, { useEffect, useRef, useState } from "react";
import PixelForge from "../assets/horizontal.png";
import { IoMdArrowRoundForward } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  {
    link: "#home",
    title: "Home",
  },
  {
    link: "#services",
    title: "Services",
  },
  {
    link: "#whyus",
    title: "Why Us",
  },
  {
    link: "#work",
    title: "Our Work",
  },
  {
    link: "#process",
    title: "Process",
  },
  {
    link: "#reviews",
    title: "Reviews",
  },
  {
    link: "#contact",
    title: "Contact",
  },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // =========================
  // Active section on scroll
  // =========================
  useEffect(() => {
    const sections = links
      .map((item) => document.querySelector(item.link))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(`#${visibleSections[0].target.id}`);
        }
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-15% 0px -55% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // =========================
  // Close menu on outside click
  // =========================
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  // =========================
  // Lock body scroll on mobile
  // =========================
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // =========================
  // Handle navigation click
  // =========================
  const handleLinkClick = (link) => {
    setActiveSection(link);
    setMenuOpen(false);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 border-b border-brand-light/10 bg-brand-dark/95 py-3 backdrop-blur-md"
    >
      <nav className="mx-auto flex w-[92%] max-w-7xl items-center justify-between">
        {/* =========================
            LOGO
        ========================= */}
        <div className="w-[35%] sm:w-[25%] md:w-[20%] lg:w-[15%]">
          <a
            href="#home"
            onClick={() => handleLinkClick("#home")}
            className="inline-block"
          >
            <img
              src={PixelForge}
              className="w-28 sm:w-32 md:w-[85%] lg:w-[80%]"
              alt="PixelForge Studio"
            />
          </a>
        </div>

        {/* =========================
            DESKTOP MENU
        ========================= */}
        <div className="hidden w-[65%] items-center justify-center gap-7 font-body lg:flex">
          {links.map((item) => {
            const isActive = activeSection === item.link;

            return (
              <a
                href={item.link}
                key={item.title}
                onClick={() => handleLinkClick(item.link)}
                className={`
                  group relative py-2
                  font-body text-[0.9rem] font-semibold
                  transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-brand-amber"
                      : "text-brand-light hover:text-brand-amber"
                  }
                `}
              >
                {item.title}

                {/* Animated underline */}
                <span
                  className={`
                    absolute bottom-0 left-1/2 h-0.5
                    -translate-x-1/2 rounded-full
                    bg-brand-amber
                    transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* =========================
            DESKTOP CTA
        ========================= */}
        <div className="hidden w-[20%] items-center justify-end lg:flex">
          <a
            href="#contact"
            onClick={() => handleLinkClick("#contact")}
            className="
              group flex items-center justify-center gap-2
              rounded-full border-2 border-brand-amber
              px-4 py-2
              font-body text-[0.85rem] font-extrabold
              text-brand-amber
              transition-all duration-300 ease-in-out
              hover:bg-brand-amber hover:text-brand-dark
              hover:shadow-[0_0_20px_rgba(232,89,12,0.25)]
            "
          >
            <span>Start a Project</span>

            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
              <IoMdArrowRoundForward />
            </span>
          </a>
        </div>

        {/* =========================
            MOBILE MENU BUTTON
        ========================= */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl border border-brand-amber/40
            text-2xl text-brand-amber
            transition-all duration-300
            hover:border-brand-amber
            hover:bg-brand-amber/10
            lg:hidden
          "
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {/* =========================
          MOBILE / TABLET MENU
      ========================= */}
      <div
        className={`
          absolute left-0 top-full w-full
          overflow-hidden
          border-b border-brand-amber/20
          bg-brand-dark/98
          backdrop-blur-xl
          transition-all duration-500 ease-in-out
          lg:hidden
          ${
            menuOpen
              ? "visible max-h-162.5 opacity-100"
              : "invisible max-h-0 opacity-0"
          }
        `}
      >
        <div className="mx-auto w-[92%] max-w-2xl py-5">
          {/* Mobile links */}
          <div className="flex flex-col gap-1">
            {links.map((item, index) => {
              const isActive = activeSection === item.link;

              return (
                <a
                  href={item.link}
                  key={item.title}
                  onClick={() => handleLinkClick(item.link)}
                  style={{
                    transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                  }}
                  className={`
                    group flex items-center justify-between
                    rounded-xl px-4 py-3.5
                    font-body text-sm font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-brand-amber/10 text-brand-amber"
                        : "text-brand-light/80 hover:bg-brand-amber/5 hover:text-brand-amber"
                    }
                    ${menuOpen ? "translate-x-0" : "translate-x-5"}
                  `}
                >
                  <span>{item.title}</span>

                  {/* Active / hover indicator */}
                  <span
                    className={`
                      h-1.5 w-1.5 rounded-full
                      bg-brand-amber
                      transition-all duration-300
                      ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }
                    `}
                  />
                </a>
              );
            })}
          </div>

          {/* =========================
              MOBILE CTA
          ========================= */}
          <div className="mt-4 border-t border-brand-light/10 pt-4">
            <a
              href="#contact"
              onClick={() => handleLinkClick("#contact")}
              className="
                group flex w-full items-center justify-center
                gap-2 rounded-xl
                bg-brand-amber
                px-5 py-3.5
                font-body text-sm font-extrabold
                text-brand-dark
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(232,89,12,0.3)]
              "
            >
              <span>Start a Project</span>

              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                <IoMdArrowRoundForward />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
