import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const ringPosition = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !glow || !label) return;

    let animationFrame;

    const moveCursor = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Main dot follows instantly
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      // Glow follows slightly behind
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;

      // Label stays with cursor
      label.style.left = `${e.clientX}px`;
      label.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      // Smooth delayed ring movement
      ringPosition.current.x +=
        (mouse.current.x - ringPosition.current.x) * 0.12;

      ringPosition.current.y +=
        (mouse.current.y - ringPosition.current.y) * 0.12;

      ring.style.left = `${ringPosition.current.x}px`;
      ring.style.top = `${ringPosition.current.y}px`;

      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "a, button, input, textarea, select, [data-cursor]",
      );

      if (!target) {
        ring.classList.remove("is-hover");
        dot.classList.remove("is-hover");
        glow.classList.remove("is-hover");
        label.classList.remove("is-visible");
        return;
      }

      ring.classList.add("is-hover");
      dot.classList.add("is-hover");
      glow.classList.add("is-hover");

      const customText = target.getAttribute("data-cursor");

      if (customText) {
        label.textContent = customText;
      } else if (target.tagName === "A") {
        label.textContent = "OPEN";
      } else {
        label.textContent = "CLICK";
      }

      label.classList.add("is-visible");
    };

    const handleMouseDown = () => {
      dot.classList.add("is-click");
      ring.classList.add("is-click");
    };

    const handleMouseUp = () => {
      dot.classList.remove("is-click");
      ring.classList.remove("is-click");
    };

    const handleMouseLeave = () => {
      dot.classList.add("is-hidden");
      ring.classList.add("is-hidden");
      glow.classList.add("is-hidden");
      label.classList.add("is-hidden");
    };

    const handleMouseEnter = () => {
      dot.classList.remove("is-hidden");
      ring.classList.remove("is-hidden");
      glow.classList.remove("is-hidden");
      label.classList.remove("is-hidden");
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);

      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div ref={dotRef} className="pf-cursor-dot" />

      {/* Soft glow */}
      <div ref={glowRef} className="pf-cursor-glow" />

      {/* Outer ring */}
      <div ref={ringRef} className="pf-cursor-ring">
        <span className="pf-cursor-line pf-line-top" />
        <span className="pf-cursor-line pf-line-right" />
        <span className="pf-cursor-line pf-line-bottom" />
        <span className="pf-cursor-line pf-line-left" />
      </div>

      {/* Hover label */}
      <div ref={labelRef} className="pf-cursor-label" />
    </>
  );
};

export default CustomCursor;
