"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Image, History, Settings, User } from "lucide-react";
import { useSession } from "next-auth/react";

export function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes = [
    {
      href: "/",
      icon: Home,
      text: "Home",
    },
    {
      href: "/generate",
      icon: Image,
      text: "Generate",
    },
    {
      href: "/history",
      icon: History,
      text: "History",
    },
    {
      href: session ? "/profile" : "/login",
      icon: User,
      text: session ? "Profile" : "Sign In",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 py-2 bg-background border-t">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {routes.map(({ href, icon: Icon, text }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
              pathname === href
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{text}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
