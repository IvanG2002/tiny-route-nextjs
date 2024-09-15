"use client"
import { cn } from "@/lib/utils"
import { DashboardIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Bug, Contact, ExternalLink, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { Badge } from "./ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { Button } from "./ui/button"

const HomeRoutes = {
    user: [
        {
            title: "Dashboard",
            icon: DashboardIcon,
            href: "/dashboard"
        },
        {
            title: "Settings",
            icon: Settings,
            href: "/dashboard/settings"
        },
        {
            title: "Report a bug",
            icon: Bug,
            external: ExternalLink,
            href: "https://github.com/IvanG2002/TinyRoute/issues/new"
        },
        {
            title: "Contact",
            icon: Contact,
            external: ExternalLink,
            href: "https://linkedin.com/in/ivan-lomeli-reyna-a98811222"
        }
    ],
}
function Header() {
    const pathName = usePathname()
    return (
        <header className={cn("bg-white h-12 flex p-3 items-center justify-between font-mono",
            pathName === "/" ? "border-b border-[#e8e8e8]" : ""
        )}>
            <section className='flex gap-4 items-center'>
                <Link href="/">
                    <span className="text-xs">
                        🔗TinyRoute
                    </span>
                </Link>
                <Badge variant="outline"><span>Beta</span></Badge>
            </section>
            <section className="flex items-center gap-4">
                <Link href="/auth"><Button className={cn("h-9 w-20",
                    pathName === "/auth" ? "hidden" : "block"
                )}>Sign In</Button></Link>
                <Link href="https://github.com/IvanG2002/TinyRoute" target="_blank" className="cursor-pointer">
                    <GitHubLogoIcon className="h-5 w-5"></GitHubLogoIcon>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='h-5 w-5'>
                            <AvatarImage src="logo avatar" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-3">
                        <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {
                            HomeRoutes.user.map(route => (
                                <DropdownMenuItem className="cursor-pointer" key={route.title} asChild>
                                    <Link href={route.href} target={route?.external ? "_blank" : ""}>
                                        <div className='flex items-center justify-between mr-auto gap-2'>
                                            <route.icon className="h-3 w-3" />
                                            <span className='mx-auto text-[13px]'>{route.title}</span>
                                            {route?.external ? <route.external className="h-3 w-3" /> : ""}
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </section>
        </header>
    )
}

export default Header