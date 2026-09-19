import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import { API_URL } from "../../Backend/src/config/api";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Success popup
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Loading
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error
  const [error, setError] = useState("");

  // Form
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    rating: 5,
  });

  // ==========================================
  // FETCH APPROVED REVIEWS
  // ==========================================

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);
        setError("");

        const response = await fetch(`${API_URL}/reviews`);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch reviews.");
        }

        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Fetch reviews error:", error);
        setError("Unable to load reviews right now.");
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, []);

  // ==========================================
  // RESPONSIVE CARDS
  // ==========================================

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  // ==========================================
  // PREVENT INVALID INDEX
  // ==========================================

  useEffect(() => {
    const maxIndex = Math.max(0, reviews.length - visibleCards);

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [reviews.length, visibleCards, currentIndex]);

  // ==========================================
  // AUTO CAROUSEL
  // ==========================================

  useEffect(() => {
    if (
      isPaused ||
      isModalOpen ||
      isSuccessOpen ||
      reviews.length <= visibleCards
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= reviews.length - visibleCards) {
          return 0;
        }

        return prev + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, isSuccessOpen, visibleCards, reviews.length]);

  // ==========================================
  // CLOSE MODAL WITH ESCAPE
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setIsSuccessOpen(false);
      }
    };

    if (isModalOpen || isSuccessOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isSuccessOpen]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // STAR SELECTION
  // ==========================================

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.role.trim() ||
      !formData.review.trim()
    ) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          role: formData.role.trim(),
          review: formData.review.trim(),
          rating: Number(formData.rating),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit review.");
      }

      // Reset form
      setFormData({
        name: "",
        role: "",
        review: "",
        rating: 5,
      });

      // Close review form
      setIsModalOpen(false);

      // Show success popup
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Submit review error:", error);

      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="reviews"
        className="
          scroll-mt-21.25
          overflow-hidden
          bg-brand-dark
          px-5
          py-12
          sm:px-8
          sm:py-14
          md:px-10
          md:py-16
        "
      >
        {/* HEADER */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-6
            sm:mb-12
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
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
              REVIEWS
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
              What Our Clients Say
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
              Real feedback from businesses we've worked with — see what it's
              like to build your website with PixelForge Studio.
            </p>
          </div>

          {/* ADD REVIEW BUTTON */}

          <button
            type="button"
            onClick={() => {
              setError("");
              setIsModalOpen(true);
            }}
            className="
              group
              flex
              w-fit
              shrink-0
              cursor-pointer
              items-center
              gap-3
              rounded-full
              border-2
              border-brand-amber
              bg-transparent
              px-5
              py-2.5
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
              hover:shadow-[0_0_25px_rgba(232,89,12,0.25)]
              sm:px-6
              sm:py-3
            "
          >
            Add a Review
            <FaArrowRight
              className="
                text-sm
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        </div>

        {/* REVIEWS CAROUSEL */}

        <div
          className="relative mx-auto max-w-375"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {isLoadingReviews ? (
            <div className="flex min-h-67.5 items-center justify-center">
              <p className="font-body text-sm text-brand-light/50">
                Loading reviews...
              </p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="flex min-h-67.5 items-center justify-center">
              <div className="text-center">
                <p className="font-body text-sm text-brand-light/50">
                  No reviews available yet.
                </p>

                <p className="mt-2 font-body text-xs text-brand-light/30">
                  Be the first to share your experience.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div
                  className="
                    flex
                    transition-transform
                    duration-700
                    ease-in-out
                  "
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / visibleCards)
                    }%)`,
                  }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="
                        shrink-0
                        px-2
                      "
                      style={{
                        width: `${100 / visibleCards}%`,
                      }}
                    >
                      <div
                        className="
                          group
                          relative
                          flex
                          h-full
                          min-h-67.5
                          cursor-pointer
                          flex-col
                          overflow-hidden
                          rounded-2xl
                          border
                          border-brand-light/10
                          bg-[#191C21]
                          p-5
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-brand-amber/50
                          hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                          sm:p-6
                        "
                      >
                        {/* CORNER DETAIL */}

                        <div
                          className="
                            absolute
                            right-0
                            top-0
                            h-20
                            w-20
                            rounded-bl-full
                            bg-brand-amber/4
                          "
                        />

                        {/* QUOTE ICON */}

                        <div
                          className="
                            relative
                            mb-5
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-brand-amber/40
                            text-brand-amber
                            transition-all
                            duration-300
                            group-hover:border-brand-amber
                            group-hover:bg-brand-amber
                            group-hover:text-brand-dark
                          "
                        >
                          <FaQuoteLeft className="text-sm" />
                        </div>

                        {/* REVIEW */}

                        <p
                          className="
                            relative
                            flex-1
                            font-body
                            text-xs
                            leading-6
                            text-brand-light/70
                            sm:text-sm
                            sm:leading-6
                          "
                        >
                          "{review.review}"
                        </p>

                        {/* STARS */}

                        <div className="mt-5 flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar
                              key={index}
                              className={`
                                text-[11px]
                                ${
                                  index < Number(review.rating)
                                    ? "text-brand-amber"
                                    : "text-brand-light/15"
                                }
                              `}
                            />
                          ))}
                        </div>

                        <div className="my-4 h-px w-full bg-brand-light/10" />

                        {/* USER */}

                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-brand-amber
                              font-body
                              text-xs
                              font-black
                              text-brand-dark
                            "
                          >
                            {review.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3
                              className="
                                font-body
                                text-xs
                                font-extrabold
                                text-brand-light
                              "
                            >
                              {review.name}
                            </h3>

                            <p
                              className="
                                mt-0.5
                                font-body
                                text-[10px]
                                text-brand-light/40
                              "
                            >
                              {review.role}
                            </p>
                          </div>
                        </div>

                        {/* NUMBER */}

                        <span
                          className="
                            absolute
                            bottom-3
                            right-4
                            font-body
                            text-[9px]
                            font-black
                            tracking-widest
                            text-brand-light/10
                          "
                        >
                          {String(review.id).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CAROUSEL INDICATORS */}

              <div className="mt-7 flex items-center justify-center gap-2">
                {Array.from({
                  length: Math.max(1, reviews.length - visibleCards + 1),
                }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to review ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      h-1.5
                      cursor-pointer
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        currentIndex === index
                          ? "w-7 bg-brand-amber"
                          : "w-1.5 bg-brand-light/20 hover:bg-brand-light/40"
                      }
                    `}
                  />
                ))}
              </div>
            </>
          )}

          {error && !isModalOpen && (
            <p className="mt-4 text-center font-body text-xs text-brand-amber">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* ============================= */}
      {/* ADD REVIEW GLASSMORPHISM MODAL */}
      {/* ============================= */}

      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-100
            flex
            items-center
            justify-center
            bg-brand-dark/80
            px-4
            py-6
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              if (!isSubmitting) {
                setIsModalOpen(false);
              }
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-xl
              overflow-hidden
              rounded-3xl
              border
              border-brand-light/15
              bg-[#191C21]/90
              shadow-[0_25px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
            "
          >
            {/* AMBER ATMOSPHERE */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-brand-amber/10
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
                bg-brand-amber/5
                blur-3xl
              "
            />

            {/* MODAL CONTENT */}

            <div className="relative p-6 sm:p-8">
              {/* TOP */}

              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <div
                    className="
                      mb-2
                      font-body
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-brand-amber
                    "
                  >
                    SHARE YOUR EXPERIENCE
                  </div>

                  <h3
                    className="
                      font-heading
                      text-2xl
                      font-bold
                      text-brand-light
                      sm:text-3xl
                    "
                  >
                    Add a Review
                  </h3>

                  <p
                    className="
                      mt-2
                      max-w-md
                      font-body
                      text-xs
                      leading-5
                      text-brand-light/50
                      sm:text-sm
                    "
                  >
                    Tell us about your experience with PixelForge Studio.
                  </p>
                </div>

                {/* CLOSE */}

                <button
                  type="button"
                  onClick={() => {
                    if (!isSubmitting) {
                      setIsModalOpen(false);
                    }
                  }}
                  aria-label="Close review form"
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-brand-light/10
                    text-brand-light/50
                    transition-all
                    duration-300
                    hover:border-brand-amber
                    hover:bg-brand-amber
                    hover:text-brand-dark
                  "
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* ERROR */}

              {error && (
                <div
                  className="
                    mb-5
                    rounded-xl
                    border
                    border-brand-amber/30
                    bg-brand-amber/5
                    px-4
                    py-3
                    font-body
                    text-xs
                    leading-5
                    text-brand-amber
                  "
                >
                  {error}
                </div>
              )}

              {/* FORM */}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* NAME + ROLE */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="
                        mb-2
                        block
                        font-body
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/60
                      "
                    >
                      Your Name
                    </label>

                    <input
                      id="review-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      disabled={isSubmitting}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-brand-light/10
                        bg-brand-dark/60
                        px-4
                        py-3
                        font-body
                        text-sm
                        text-brand-light
                        outline-none
                        placeholder:text-brand-light/25
                        transition-all
                        duration-300
                        focus:border-brand-amber
                        focus:bg-brand-dark
                        focus:shadow-[0_0_20px_rgba(232,89,12,0.08)]
                      "
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="review-role"
                      className="
                        mb-2
                        block
                        font-body
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-brand-light/60
                      "
                    >
                      Role
                    </label>

                    <input
                      id="review-role"
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Business Owner"
                      required
                      disabled={isSubmitting}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-brand-light/10
                        bg-brand-dark/60
                        px-4
                        py-3
                        font-body
                        text-sm
                        text-brand-light
                        outline-none
                        placeholder:text-brand-light/25
                        transition-all
                        duration-300
                        focus:border-brand-amber
                        focus:bg-brand-dark
                        focus:shadow-[0_0_20px_rgba(232,89,12,0.08)]
                      "
                    />
                  </div>
                </div>

                {/* REVIEW */}

                <div>
                  <label
                    htmlFor="review-message"
                    className="
                      mb-2
                      block
                      font-body
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-brand-light/60
                    "
                  >
                    Your Review
                  </label>

                  <textarea
                    id="review-message"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="Write your experience..."
                    required
                    rows={5}
                    disabled={isSubmitting}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-brand-light/10
                      bg-brand-dark/60
                      px-4
                      py-3
                      font-body
                      text-sm
                      leading-6
                      text-brand-light
                      outline-none
                      placeholder:text-brand-light/25
                      transition-all
                      duration-300
                      focus:border-brand-amber
                      focus:bg-brand-dark
                      focus:shadow-[0_0_20px_rgba(232,89,12,0.08)]
                    "
                  />
                </div>

                {/* RATING */}

                <div>
                  <label
                    className="
                      mb-3
                      block
                      font-body
                      text-xs
                      font-bold
                      uppercase
                      tracking-wider
                      text-brand-light/60
                    "
                  >
                    Your Rating
                  </label>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        aria-label={`${star} star`}
                        disabled={isSubmitting}
                        className="
                          cursor-pointer
                          p-1
                          transition-transform
                          duration-200
                          hover:scale-110
                        "
                      >
                        <FaStar
                          className={`
                            text-2xl
                            transition-colors
                            duration-200
                            ${
                              star <= formData.rating
                                ? "text-brand-amber"
                                : "text-brand-light/15"
                            }
                          `}
                        />
                      </button>
                    ))}

                    <span
                      className="
                        ml-2
                        font-body
                        text-xs
                        font-bold
                        text-brand-light/50
                      "
                    >
                      {formData.rating}/5
                    </span>
                  </div>
                </div>

                {/* BUTTONS */}

                <div
                  className="
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-brand-light/10
                    pt-5
                    sm:flex-row
                    sm:justify-end
                  "
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="
                      cursor-pointer
                      rounded-full
                      border
                      border-brand-light/15
                      px-6
                      py-3
                      font-body
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-brand-light/60
                      transition-all
                      duration-300
                      hover:border-brand-light/30
                      hover:text-brand-light
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group
                      flex
                      cursor-pointer
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border-2
                      border-brand-amber
                      bg-brand-amber
                      px-6
                      py-3
                      font-body
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-wider
                      text-brand-dark
                      transition-all
                      duration-300
                      hover:shadow-[0_0_25px_rgba(232,89,12,0.30)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}

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
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* REVIEW SUBMITTED SUCCESS POPUP */}
      {/* ========================================== */}

      {isSuccessOpen && (
        <div
          className="
            fixed
            inset-0
            z-100
            flex
            items-center
            justify-center
            bg-brand-dark/80
            px-4
            py-6
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsSuccessOpen(false);
            }
          }}
        >
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-brand-light/15
              bg-[#191C21]/90
              shadow-[0_25px_100px_rgba(0,0,0,0.55)]
              backdrop-blur-2xl
            "
          >
            {/* AMBER ATMOSPHERE */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-brand-amber/10
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
                bg-brand-amber/5
                blur-3xl
              "
            />

            <div className="relative p-7 text-center sm:p-9">
              {/* CLOSE */}

              <button
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                aria-label="Close success message"
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-9
                  w-9
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-brand-light/10
                  text-brand-light/50
                  transition-all
                  duration-300
                  hover:border-brand-amber
                  hover:bg-brand-amber
                  hover:text-brand-dark
                "
              >
                <FaTimes className="text-sm" />
              </button>

              {/* SUCCESS ICON */}

              <div
                className="
                  mx-auto
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-brand-amber
                  bg-brand-amber
                  text-brand-dark
                  shadow-[0_0_30px_rgba(232,89,12,0.20)]
                "
              >
                <FaCheck className="text-xl" />
              </div>

              {/* SMALL TITLE */}

              <div
                className="
                  mb-2
                  font-body
                  text-xs
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-brand-amber
                "
              >
                REVIEW SUBMITTED
              </div>

              {/* HEADING */}

              <h3
                className="
                  font-heading
                  text-2xl
                  font-bold
                  text-brand-light
                  sm:text-3xl
                "
              >
                Thanks for your review!
              </h3>

              {/* MESSAGE */}

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-sm
                  font-body
                  text-sm
                  leading-6
                  text-brand-light/60
                "
              >
                Your review has been submitted successfully and is awaiting
                approval. We'll review and approve it within 24 hours.
              </p>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={() => setIsSuccessOpen(false)}
                className="
                  mt-7
                  cursor-pointer
                  rounded-full
                  border-2
                  border-brand-amber
                  bg-brand-amber
                  px-7
                  py-3
                  font-body
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-wider
                  text-brand-dark
                  transition-all
                  duration-300
                  hover:shadow-[0_0_25px_rgba(232,89,12,0.30)]
                "
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
