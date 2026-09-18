import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../assets/horizontal.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Our Work", href: "#work" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Web Development",
    "Shopify Store Development",
    "WordPress Websites",
    "Video Editing",
  ];

  const socials = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/pixelforgestudio05",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/@pixelforgestudio05",
    },
    {
      name: "X",
      icon: <FaXTwitter />,
      href: "https://x.com/pixelforge_co",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@pixelforgestudio05",
    },
    {
      name: "TikTok",
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@pixelforgestudio05",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      href: "https://github.com/pixelforgestudio05",
    },
  ];

  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* 4 MAIN SECTIONS */}
        <div className="grid grid-cols-1 gap-12 border-b border-brand-light/10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-16">
          {/* 01 — BRAND */}
          <div>
            <a href="#home" className="inline-block">
              <img
                src={Logo}
                alt="PixelForge Studio"
                className="w-40 sm:w-44"
              />
            </a>

            <p className="mt-5 max-w-xs font-body text-sm leading-6 text-brand-light/60">
              Every great website starts with a spark. We forge the rest.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-light/15 text-brand-light/60 transition-all duration-300 hover:border-brand-amber hover:bg-brand-amber hover:text-brand-dark"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 02 — QUICK LINKS */}
          <div>
            <h3 className="font-body text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 font-body text-sm text-brand-light/60 transition-colors duration-300 hover:text-brand-amber"
                >
                  <span className="h-px w-0 bg-brand-amber transition-all duration-300 group-hover:w-3" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* 03 — SERVICES */}
          <div>
            <h3 className="font-body text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">
              Services
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {services.map((service) => (
                <a
                  key={service}
                  href="#services"
                  className="group flex w-fit items-center gap-2 font-body text-sm leading-5 text-brand-light/60 transition-colors duration-300 hover:text-brand-amber"
                >
                  <span className="h-px w-0 shrink-0 bg-brand-amber transition-all duration-300 group-hover:w-3" />
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* 04 — CONTACT */}
          <div>
            <h3 className="font-body text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">
              Contact
            </h3>

            <div className="mt-6 flex flex-col gap-5">
              {/* Phone */}
              <a
                href="tel:+923354051272"
                className="group flex items-start gap-3 font-body text-sm text-brand-light/60 transition-colors duration-300 hover:text-brand-amber"
              >
                <FaPhoneAlt className="mt-1 shrink-0 text-brand-amber" />
                <span>+92 309 5784729</span>
              </a>

              {/* Email */}
              <a
                href="mailto:pixelforgestudio05@gmail.com"
                className="group flex items-start gap-3 break-all font-body text-sm text-brand-light/60 transition-colors duration-300 hover:text-brand-amber"
              >
                <FaEnvelope className="mt-1 shrink-0 text-brand-amber" />
                <span>pixelforgestudio05@gmail.com</span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-3 font-body text-sm leading-6 text-brand-light/60">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-brand-amber" />
                <span>Dera Ismail Khan, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6">
          <p className="text-center font-body text-xs leading-5 text-brand-light/40 sm:text-sm">
            © 2026 PixelForge Studio. Forged with code, not templates.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
