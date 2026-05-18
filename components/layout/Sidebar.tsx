"use client";

import {
  ChartColumnBigIcon,
  LayoutPanelLeftIcon,
  ListCheckIcon,
  SettingsIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutPanelLeftIcon,
    href: "/"
  },
  {
    key: "analytics",
    title: "Analytics",
    icon: ChartColumnBigIcon,
    href: "/analytics"
  },
  {
    key: "habits",
    title: "Habits",
    icon: ListCheckIcon,
    href: "/habits"
  },
  {
    key: "settings",
    title: "Settings",
    icon: SettingsIcon,
    href: "/settings"
  }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="p-4 space-y-3">
      {menu.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className={`block p-2 rounded-lg hover:text-black hover:bg-white transition-colors duration-300 ${pathname === item.href ? "bg-white/80 text-black/80" : ""}`}
        >
          <item.icon />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
