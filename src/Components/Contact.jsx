import React, { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

import ContactBg from "../assets/contactbg.png";
import { API_URL } from "../../Backend/src/config/api";

const services = [
  "Web Development",
  "Shopify Store Development",
  "WordPress Website",
  "Video Editing",
  "Not Sure Yet",
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const serviceRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setIsServiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove previous error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // ==========================================
  // HANDLE SERVICE SELECTION
  // ==========================================

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({
      ...prev,
      service,
    }));

    setIsServiceOpen(false);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setIsServiceOpen(false);
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error.message || "Unable to send your message. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // RESET SUCCESS STATE
  // ==========================================

  const handleSendAnother = () => {
    setSubmitted(false);
    setErrorMessage("");
  };

  return (
    <section
      id="contact"
      className="
        relative
        scroll-mt-21.25
        overflow-hidden
        bg-brand-dark
        px-5
        py-12
        sm:px-8
        sm:py-14
        md:px-10
        md:py-20
      "
      style={{
        backgroundImage: `url(${ContactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ========================================== */}
      {/* DARK BACKGROUND OVERLAY */}
      {/* ========================================== */}

      <div className="pointer-events-none absolute inset-0 bg-brand-dark/85" />

      {/* ========================================== */}
      {/* SUBTLE AMBER ATMOSPHERE */}
      {/* ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-125
          w-175
          -translate-x-1/2
          rounded-full
          bg-brand-amber/5
          blur-[120px]
        "
      />

      {/* ========================================== */}
      {/* MAIN CONTENT */}
      {/* ========================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ========================================== */}
        {/* SECTION HEADER */}
        {/* ========================================== */}

        <div className="mb-10 md:mb-12">
          {/* CONTACT LABEL */}

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
            CONTACT
          </div>

          {/* MAIN HEADING */}

          <h2
            className="
              max-w-4xl
              font-heading
              text-3xl
              font-bold
              leading-[1.05]
              text-brand-light
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Let's Build Something Great Together
          </h2>

          {/* SUBTITLE */}

          <p
            className="
              mt-4
              max-w-2xl
              font-body
              text-sm
              leading-7
              text-brand-light/65
              sm:text-base
              md:text-[1.05rem]
            "
          >
            Have a project in mind? Tell us about your business and goals, and
            we'll get back to you with how we can help — no pressure, no spam,
            just a real conversation.
          </p>
        </div>

        {/* ========================================== */}
        {/* CONTACT GRID */}
        {/* ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-8
          "
        >
          {/* ======================================== */}
          {/* LEFT CONTACT DETAILS */}
          {/* ======================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-brand-light/10
              bg-[#191C21]/95
              p-6
              backdrop-blur-xl
              sm:p-8
              md:p-9
            "
          >
            {/* Decorative Amber Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-brand-amber/10
                blur-3xl
              "
            />

            {/* Decorative Grid */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-0
                right-0
                h-48
                w-48
                opacity-[0.05]
                bg-[linear-gradient(var(--color-brand-amber)_1px,transparent_1px),linear-gradient(90deg,var(--color-brand-amber)_1px,transparent_1px)]
                bg-size-[24px_24px]
                mask-image-[linear-gradient(to_top_left,black,transparent)]
              "
            />

            <div className="relative">
              {/* Small Label */}

              <div
                className="
                  font-body
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-brand-amber
                "
              >
                LET'S TALK
              </div>

              {/* Heading */}

              <h3
                className="
                  mt-3
                  font-heading
                  text-2xl
                  font-bold
                  leading-tight
                  text-brand-light
                  sm:text-3xl
                "
              >
                Have a question?
                <br />
                We're here to help.
              </h3>

              {/* Description */}

              <p
                className="
                  mt-4
                  max-w-sm
                  font-body
                  text-xs
                  leading-6
                  text-brand-light/50
                  sm:text-sm
                "
              >
                Whether you have a project ready to go or just an idea you're
                exploring, feel free to reach out.
              </p>

              {/* ==================================== */}
              {/* CONTACT DETAILS */}
              {/* ==================================== */}

              <div className="mt-8 space-y-4">
                {/* LOCATION */}

                <div
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-brand-light/10
                    bg-brand-light/2
                    p-4
                    transition-all
                    duration-300
                    hover:border-brand-amber/40
                    hover:bg-brand-amber/4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-amber/30
                      text-brand-amber
                      transition-all
                      duration-300
                      group-hover:border-brand-amber
                      group-hover:bg-brand-amber
                      group-hover:text-brand-dark
                    "
                  >
                    <FaMapMarkerAlt className="text-sm" />
                  </div>

                  <div>
                    <p
                      className="
                        font-body
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-brand-light/30
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                        mt-1
                        font-body
                        text-xs
                        font-semibold
                        text-brand-light/75
                        sm:text-sm
                      "
                    >
                      Dera Ismail Khan, Pakistan
                    </p>
                  </div>
                </div>

                {/* EMAIL */}

                <a
                  href="mailto:pixelforgestudio05@gmail.com"
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-brand-light/10
                    bg-brand-light/2
                    p-4
                    transition-all
                    duration-300
                    hover:border-brand-amber/40
                    hover:bg-brand-amber/4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-amber/30
                      text-brand-amber
                      transition-all
                      duration-300
                      group-hover:border-brand-amber
                      group-hover:bg-brand-amber
                      group-hover:text-brand-dark
                    "
                  >
                    <FaEnvelope className="text-sm" />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        font-body
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-brand-light/30
                      "
                    >
                      Email
                    </p>

                    <p
                      className="
                        mt-1
                        truncate
                        font-body
                        text-xs
                        font-semibold
                        text-brand-light/75
                        sm:text-sm
                      "
                    >
                      pixelforgestudio05@gmail.com
                    </p>
                  </div>
                </a>

                {/* PHONE */}

                <a
                  href="tel:+923095784729"
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-brand-light/10
                    bg-brand-light/2
                    p-4
                    transition-all
                    duration-300
                    hover:border-brand-amber/40
                    hover:bg-brand-amber/4
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-amber/30
                      text-brand-amber
                      transition-all
                      duration-300
                      group-hover:border-brand-amber
                      group-hover:bg-brand-amber
                      group-hover:text-brand-dark
                    "
                  >
                    <FaPhoneAlt className="text-sm" />
                  </div>

                  <div>
                    <p
                      className="
                        font-body
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-brand-light/30
                      "
                    >
                      Phone
                    </p>

                    <p
                      className="
                        mt-1
                        font-body
                        text-xs
                        font-semibold
                        text-brand-light/75
                        sm:text-sm
                      "
                    >
                      +92 309 5784729
                    </p>
                  </div>
                </a>
              </div>

              {/* ==================================== */}
              {/* WHATSAPP BUTTON */}
              {/* ==================================== */}

              <a
                href="https://wa.me/923095784729"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-full
                  border-2
                  border-brand-amber
                  bg-transparent
                  px-5
                  py-3.5
                  transition-all
                  duration-300
                  hover:bg-brand-amber
                  hover:shadow-[0_0_25px_rgba(232,89,12,0.20)]
                "
              >
                <div className="flex items-center gap-3">
                  <FaWhatsapp
                    className="
                      text-lg
                      text-brand-amber
                      transition-colors
                      duration-300
                      group-hover:text-brand-dark
                    "
                  />

                  <span
                    className="
                      font-body
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-brand-amber
                      transition-colors
                      duration-300
                      group-hover:text-brand-dark
                    "
                  >
                    Message us on WhatsApp
                  </span>
                </div>

                <FaArrowRight
                  className="
                    text-sm
                    text-brand-amber
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-brand-dark
                  "
                />
              </a>

              {/* Bottom Label */}

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-brand-amber/40" />

                <span
                  className="
                    font-body
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.25em]
                    text-brand-light/20
                  "
                >
                  AVAILABLE WORLDWIDE
                </span>
              </div>
            </div>
          </div>

          {/* ======================================== */}
          {/* RIGHT FORM BOX */}
          {/* ======================================== */}

          <div
            className="
              relative
              overflow-visible
              rounded-3xl
              border
              border-brand-light/10
              bg-[#191C21]/90
              p-5
              shadow-[0_25px_80px_rgba(0,0,0,0.25)]
              backdrop-blur-2xl
              sm:p-7
              md:p-9
            "
          >
            {/* ==================================== */}
            {/* SUCCESS STATE */}
            {/* ==================================== */}

            {submitted ? (
              <div
                className="
                  flex
                  min-h-125
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                {/* Success Icon */}

                <div
                  className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-brand-amber
                    bg-brand-amber
                    text-brand-dark
                    shadow-[0_0_35px_rgba(232,89,12,0.20)]
                  "
                >
                  <FaCheck className="text-xl" />
                </div>

                {/* Label */}

                <div
                  className="
                    mb-3
                    font-body
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-brand-amber
                  "
                >
                  MESSAGE SENT
                </div>

                {/* Heading */}

                <h3
                  className="
                    max-w-md
                    font-heading
                    text-3xl
                    font-bold
                    leading-tight
                    text-brand-light
                    sm:text-4xl
                  "
                >
                  Thanks! We've Got It.
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-4
                    max-w-md
                    font-body
                    text-sm
                    leading-6
                    text-brand-light/60
                  "
                >
                  Your message has been received — we'll get back to you soon.
                </p>

                {/* Another Message */}

                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="
                    mt-8
                    cursor-pointer
                    rounded-full
                    border-2
                    border-brand-amber
                    bg-transparent
                    px-6
                    py-3
                    font-body
                    text-xs
                    font-extrabold
                    uppercase
                    tracking-wider
                    text-brand-amber
                    transition-all
                    duration-300
                    hover:bg-brand-amber
                    hover:text-brand-dark
                  "
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* ==================================== */
              /* CONTACT FORM */
              /* ==================================== */

              <form onSubmit={handleSubmit} className="relative space-y-5">
                {/* Form Header */}

                <div className="mb-7">
                  <p
                    className="
                      font-body
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-brand-amber
                    "
                  >
                    START A CONVERSATION
                  </p>

                  <h3
                    className="
                      mt-2
                      font-heading
                      text-2xl
                      font-bold
                      text-brand-light
                      sm:text-3xl
                    "
                  >
                    Tell us about your project.
                  </h3>
                </div>

                {/* ================================= */}
                {/* NAME + EMAIL */}
                {/* ================================= */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* NAME */}

                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2
                        block
                        font-body
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/45
                      "
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                      className="
                        w-full
                        border-b
                        border-brand-light/15
                        bg-transparent
                        px-0
                        py-3
                        font-body
                        text-sm
                        text-brand-light
                        outline-none
                        placeholder:text-brand-light/20
                        transition-all
                        duration-300
                        focus:border-brand-amber
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        font-body
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/45
                      "
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      disabled={isSubmitting}
                      className="
                        w-full
                        border-b
                        border-brand-light/15
                        bg-transparent
                        px-0
                        py-3
                        font-body
                        text-sm
                        text-brand-light
                        outline-none
                        placeholder:text-brand-light/20
                        transition-all
                        duration-300
                        focus:border-brand-amber
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </div>
                </div>

                {/* ================================= */}
                {/* PHONE + SERVICE */}
                {/* ================================= */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="
                        mb-2
                        block
                        font-body
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/45
                      "
                    >
                      Phone
                      <span className="ml-1 text-brand-light/20">
                        (Optional)
                      </span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 3XX XXXXXXX"
                      disabled={isSubmitting}
                      className="
                        w-full
                        border-b
                        border-brand-light/15
                        bg-transparent
                        px-0
                        py-3
                        font-body
                        text-sm
                        text-brand-light
                        outline-none
                        placeholder:text-brand-light/20
                        transition-all
                        duration-300
                        focus:border-brand-amber
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    />
                  </div>

                  {/* ================================= */}
                  {/* SERVICE DROPDOWN */}
                  {/* ================================= */}

                  <div ref={serviceRef} className="relative">
                    <label
                      className="
                        mb-2
                        block
                        font-body
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/45
                      "
                    >
                      Service Interested In
                    </label>

                    {/* Dropdown Button */}

                    <button
                      type="button"
                      onClick={() => setIsServiceOpen((prev) => !prev)}
                      disabled={isSubmitting}
                      className={`
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        border-b
                        bg-transparent
                        px-0
                        py-3
                        text-left
                        font-body
                        text-sm
                        outline-none
                        transition-all
                        duration-300
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        ${
                          isServiceOpen
                            ? "border-brand-amber"
                            : "border-brand-light/15"
                        }
                      `}
                    >
                      <span
                        className={
                          formData.service
                            ? "text-brand-light"
                            : "text-brand-light/20"
                        }
                      >
                        {formData.service || "Select a service"}
                      </span>

                      <FaChevronDown
                        className={`
                          shrink-0
                          text-xs
                          text-brand-amber
                          transition-transform
                          duration-300
                          ${isServiceOpen ? "rotate-180" : ""}
                        `}
                      />
                    </button>

                    {/* ================================= */}
                    {/* DROPDOWN MENU */}
                    {/* ================================= */}

                    <div
                      className={`
                        absolute
                        left-0
                        right-0
                        top-full
                        z-50
                        mt-2
                        origin-top
                        overflow-hidden
                        rounded-2xl
                        border
                        border-brand-light/10
                        bg-[#191C21]
                        shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                        backdrop-blur-xl
                        transition-all
                        duration-200
                        ${
                          isServiceOpen
                            ? "visible scale-100 opacity-100"
                            : "invisible scale-95 opacity-0"
                        }
                      `}
                    >
                      {/* Dropdown Header */}

                      <div
                        className="
                          border-b
                          border-brand-light/10
                          px-4
                          py-3
                        "
                      >
                        <span
                          className="
                            font-body
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-brand-amber
                          "
                        >
                          SELECT SERVICE
                        </span>
                      </div>

                      {/* Options */}

                      <div className="p-1.5">
                        {services.map((service, index) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            disabled={isSubmitting}
                            className={`
                              group
                              flex
                              w-full
                              cursor-pointer
                              items-center
                              justify-between
                              rounded-xl
                              px-3
                              py-3
                              text-left
                              font-body
                              text-xs
                              font-semibold
                              transition-all
                              duration-200
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              ${
                                formData.service === service
                                  ? "bg-brand-amber text-brand-dark"
                                  : "text-brand-light/70 hover:bg-brand-amber/8 hover:text-brand-amber"
                              }
                            `}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`
                                  font-body
                                  text-[9px]
                                  font-black
                                  ${
                                    formData.service === service
                                      ? "text-brand-dark/50"
                                      : "text-brand-light/20"
                                  }
                                `}
                              >
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              {service}
                            </span>

                            {formData.service === service && (
                              <FaCheck className="text-[10px]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ================================= */}
                {/* MESSAGE */}
                {/* ================================= */}

                <div>
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      font-body
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-brand-light/45
                    "
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a bit about your project..."
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-brand-light/10
                      bg-brand-dark/50
                      px-4
                      py-4
                      font-body
                      text-sm
                      leading-6
                      text-brand-light
                      outline-none
                      placeholder:text-brand-light/20
                      transition-all
                      duration-300
                      focus:border-brand-amber/70
                      focus:bg-brand-dark/70
                      focus:shadow-[0_0_25px_rgba(232,89,12,0.06)]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  />
                </div>

                {/* ================================= */}
                {/* API ERROR MESSAGE */}
                {/* ================================= */}

                {errorMessage && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/5
                      px-4
                      py-3
                      font-body
                      text-xs
                      leading-5
                      text-red-300
                    "
                  >
                    {errorMessage}
                  </div>
                )}

                {/* ================================= */}
                {/* FORM FOOTER */}
                {/* ================================= */}

                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    border-t
                    border-brand-light/10
                    pt-5
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* Privacy Text */}

                  <p
                    className="
                      max-w-xs
                      font-body
                      text-[10px]
                      leading-5
                      text-brand-light/30
                    "
                  >
                    We respect your privacy. Your information will only be used
                    to respond to your project inquiry.
                  </p>

                  {/* SEND BUTTON */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      flex
                      w-full
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border-2
                      border-brand-amber
                      bg-brand-amber
                      px-7
                      py-3.5
                      font-body
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-brand-dark
                      transition-all
                      duration-300
                      hover:shadow-[0_0_30px_rgba(232,89,12,0.25)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}

                    {!isSubmitting && (
                      <FaArrowRight
                        className="
                          text-sm
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
