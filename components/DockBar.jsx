"use client";

import { useRouter } from "next/navigation";
import Dock from "./Dock";
import { Home, BookOpen, User, Settings } from "lucide-react";

export default function DockBar() {
  const router = useRouter();
  const items = [
    { icon: <Home size={18} />, label: "Home", onClick: () => router.push("/") },
    { icon: <BookOpen size={18} />, label: "Sessions", onClick: () => router.push("/sessions") },
    { icon: <User size={18} />, label: "Profile", onClick: () => router.push("/profile") },
    { icon: <Settings size={18} />, label: "Settings", onClick: () => router.push("/settings") },
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