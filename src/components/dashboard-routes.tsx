"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Link2Icon, SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardRoutes = [
    {
        title: "Links",
        path: "/dashboard",
        icon: Link2Icon,
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: SettingsIcon,
    },
];

function DashboardRoute() {
    const pathname = usePathname();

    return (
        <div className={cn("flex items-center gap-3 px-4",
            pathname === "/" ? "hidden" : ""
        )}>
            {DashboardRoutes.map((route) => (
                <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                        "group relative pb-2 pt-2 font-medium outline-2 outline-sky-400 transition-colors duration-100 hover:bg-transparent hover:text-neutral-900 focus-visible:outline dark:hover:text-white",
                        pathname === route.path
                            ? "border-b border-neutral-800 dark:border-white dark:text-white"
                            : "text-neutral-500",
                    )}
                >
                    <div className=" relative z-10 flex items-center space-x-2 text-[12px]">
                        <route.icon
                            size={13}
                            className="duration-300 group-hover:rotate-6"
                        />
                        <span>{route.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default DashboardRoute