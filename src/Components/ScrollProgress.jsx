import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-9999 h-0.75 w-full bg-brand-dark/80">
      {/* Progress line */}
      <div
        className="relative h-full bg-brand-amber transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      >
        {/* Glow */}
        <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-brand-amber/30 blur-md" />

        {/* Progress head */}
        <div className="absolute right-0 top-1/2 h-1.75 w-1.75 -translate-y-1/2 rounded-full bg-brand-light shadow-[0_0_10px_#E8590C]" />
      </div>
    </div>
  );
};

export default ScrollProgress;
