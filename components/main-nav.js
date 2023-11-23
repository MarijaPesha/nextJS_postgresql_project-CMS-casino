"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({ className, ...props }) => {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.casinoName}`,
      label: "Overview",
      active: pathName === `/${params.casinoName}`,
    },
    {
      href: `/${params.casinoName}/settings`,
      label: "Settings",
      active: pathName === `/${params.casinoName}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
