'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import MobileNav from "../MobileNav/MobileNav";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";


export default function MainNav({ items, children }) {
	const { data: session } = useSession();
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [loginSession, setLoginSession] = useState(null);

	useEffect(() => {
		setLoginSession(session)
	}, [session])

	return (
		<>
			<div className="flex gap-6 lg:gap-10">
				<Link href="/">
					<h1 className="text-2xl font-semibold">Study Mate</h1>
				</Link>
				{items?.length ? (
					<nav className="hidden gap-6 lg:flex">
						{items?.map((item, index) => (
							<Link
								key={index}
								href={item.disabled ? "#" : item.href}
								className={cn(
									"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm"
								)}>
								{item.title}
							</Link>
						))}
					</nav>
				) : null}

				{showMobileMenu && items && (
					<MobileNav items={items}>{children}</MobileNav>
				)}
			</div>
			<nav className="flex items-center gap-3">
				{!loginSession && (
					<div className="items-center gap-3 hidden lg:flex">
						<Link
							href="/auth/login"
							className={cn(buttonVariants({ size: "sm" }), "px-4")}>
							Login
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									Register
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56 mt-4">
								<DropdownMenuItem className="cursor-pointer">
									<Link href="/auth/register/student">Student</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="cursor-pointer">
									<Link href="/auth/register/instructor">Instructor</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="cursor-pointer">
							<Avatar>
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56 mt-4">
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="account">Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="account/enrolled-courses">My Courses</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							<Link href="">Testimonials & Certificates</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer" asChild>
							{loginSession && <Link href="#" onClick={() => signOut()}>Logout</Link>}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<button
					className="flex items-center space-x-2 lg:hidden"
					onClick={() => setShowMobileMenu(!showMobileMenu)}>
					{showMobileMenu ? <X /> : <Menu />}
				</button>
			</nav>
		</>
	)
}
