"use client";

import { useRef, useState } from "react";

export default function ProfileCard({
  name,
  title,
  handle,
  status,
  contactText = "Contact",
  avatarUrl,
  coverUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  description,
  className = "",
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)");

  const handleMouseMove = (e) => {
    if (!enableTilt) return;
    // Avoid tilt on mobile unless enabled
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch && !enableMobileTilt) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 20; // -10deg..10deg
    const rotateX = ((y / rect.height) - 0.5) * -20; // -10deg..10deg
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 150ms ease", transformStyle: "preserve-3d" }}
      className={`bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 p-4 sm:p-6 relative ${className}`}
    >
      {(coverUrl || avatarUrl) && (
        <div className="mb-4">
          <img
            src={coverUrl || avatarUrl}
            alt={name}
            className="w-full h-56 sm:h-64 rounded-lg object-cover border border-gray-200"
            onError={(e) => {
              e.target.src = "/placeholder-book.png";
            }}
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border border-gray-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/64x64/f3f4f6/9ca3af?text=No+Img";
          }}
        />
        {showUserInfo && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-gray-900 font-semibold truncate">{name}</h3>
              {status && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                  {status}
                </span>
              )}
            </div>
            {title && <p className="text-gray-600 text-sm truncate">{title}</p>}
            {handle && <p className="text-gray-500 text-sm truncate">@{handle}</p>}
          </div>
        )}
      </div>

      {description && (
        <p className="mt-4 text-gray-700 text-sm line-clamp-3">
          {(description || "").replace(/<[^>]*>/g, "")}
        </p>
      )}

      <div className="mt-4">
        <button
          type="button"
          onClick={onContactClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {contactText}
        </button>
      </div>
    </div>
  );
}