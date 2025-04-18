import MainNav from "@/components/Navbar/MainNav/MainNav";
import SiteFooter from "@/components/Navbar/SiteFooter/SiteFooter";
import "../globals.css";
import { SessionProvider } from "next-auth/react";

const navLinks = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Documentation",
    href: "/docs",
  },
];
export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b ">
        <SessionProvider>
          <div className="container flex h-20 items-center justify-between py-6 ">
            <MainNav items={navLinks} />
          </div>
        </SessionProvider>
      </header>
      <main className="flex-1 pt-20 flex flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
