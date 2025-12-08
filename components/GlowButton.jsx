"use client";

// A reusable GlowButton component implementing the provided .btn-101 style.
// Use it only where requested (e.g., category chips on the homepage).
// Supports rendering as different elements via `as` (e.g., Next.js Link).

export default function GlowButton({
  as: Component = 'button',
  children,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <Component className={`btn-101 ${className}`} style={style} {...rest}>
      {children}
      <svg aria-hidden="true" focusable="false">
        <defs>
          <filter id="glow">
            <feGaussianBlur result="coloredBlur" stdDeviation="5" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect />
      </svg>
    </Component>
  );
}