"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Profile", href: "/account" },
  { label: "Enrolled Courses", href: "/account/enrolled-courses" },
];

export default function AccountMenu() {
  const pathname = usePathname();
  return (
    <ul className="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">
      {menu.map((item, i) => (
        <li className="navbar-item account-menu" key={i}>
          <Link
            href={item.href}
            className={`navbar-link flex items-center py-2 rounded ${pathname === item.href ? "text-primary" : "text-slate-400"
              }`}>
            <h6 className="mb-0 font-semibold">{item?.label}</h6>
          </Link>
        </li>
      ))}
      <li className="navbar-item account-menu">
        <Link
          href="#"
          className="navbar-link text-slate-400 flex items-center py-2 rounded">
          <h6 className="mb-0 font-semibold" onClick={()=> signOut()} >Sign Out</h6>
        </Link>
      </li>
    </ul>
  )
}
