"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

function DockLabel({ visible, children }) {
  return (
    <div
      className={`absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-white/20 bg-neutral-900/90 px-2 py-0.5 text-xs transition-opacity duration-200`}
      style={{ transform: "translateX(-50%)", opacity: visible ? 1 : 0 }}
      role="tooltip"
    >
      <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
        {children}
      </span>
    </div>
  );
}

function DockItem({
  item,
  size,
  onMouseEnter,
  onMouseLeave,
  onClick,
  setRef,
}) {
  return (
    <button
      ref={setRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full text-white/80 group-hover:text-white border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 p-[2px]
      bg-gradient-to-b from-indigo-600/15 via-fuchsia-600/15 to-cyan-600/15 hover:from-indigo-600/60 hover:via-fuchsia-600/60 hover:to-cyan-600/60
      before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-tr before:from-indigo-400/20 before:via-fuchsia-400/10 before:to-cyan-400/20 before:blur-[10px] before:opacity-40 before:-z-10 before:pointer-events-none group-hover:before:opacity-60
      `}
      style={{ width: size, height: size }}
      aria-label={item.label}
    >
      <div className="flex items-center justify-center text-white/80 group-hover:text-white drop-shadow-sm">{item.icon}</div>
      <DockLabel visible={item._hovered}>{item.label}</DockLabel>
    </button>
  );
}

export default function Dock({
  items = [],
  className = "",
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [sizes, setSizes] = useState(() => items.map(() => baseItemSize));
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    // Keep refs array in sync with number of items
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );

  const updateSizes = (mouseX) => {
    const rects = itemRefs.current.map((el) => el?.getBoundingClientRect());
    const next = rects.map((rect) => {
      if (!rect) return baseItemSize;
      const center = rect.left + rect.width / 2;
      const d = Math.abs(mouseX - center);
      const t = Math.min(1, d / distance);
      const s = baseItemSize + (magnification - baseItemSize) * (1 - t);
      return Math.round(s);
    });
    setSizes(next);
  };

  const handleMouseMove = (e) => {
    updateSizes(e.pageX);
  };

  const handleMouseLeave = () => {
    setSizes(items.map(() => baseItemSize));
    setHoverIndex(-1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group pointer-events-auto fixed bottom-2 left-1/2 -translate-x-1/2 flex items-end w-fit gap-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(79,70,229,0.12)] pb-2 px-4
      hover:bg-gradient-to-r hover:from-indigo-800/40 hover:via-fuchsia-700/40 hover:to-cyan-700/40 hover:backdrop-blur-xl hover:ring-1 hover:ring-white/20
      ${className}`}
      style={{ height: panelHeight, maxHeight, zIndex: 40 }}
      role="toolbar"
      aria-label="Application dock"
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          item={{ ...item, _hovered: hoverIndex === index }}
          size={sizes[index] ?? baseItemSize}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(-1)}
          onClick={item.onClick}
          setRef={(el) => (itemRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}