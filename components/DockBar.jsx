"use client";

import Dock from "./Dock";
import { Home, BookOpen, User, Settings } from "lucide-react";

export default function DockBar() {
  const items = [
    { icon: <Home size={18} />, label: "Home", onClick: () => (window.location.href = "/") },
    { icon: <BookOpen size={18} />, label: "Sessions", onClick: () => (window.location.href = "/sessions") },
    { icon: <User size={18} />, label: "Profile", onClick: () => alert("Profile!") },
    { icon: <Settings size={18} />, label: "Settings", onClick: () => alert("Settings!") },
  ];

  return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={50}
      magnification={70}
    />
  );
}