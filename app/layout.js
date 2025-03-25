import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const poppins = Inter({ subsets: ["latin"], variable: "--font-poppins" });

export const metadata = {
  title: "Study Mate - Wold's Best Learning Platform",
  description: "Explore || Learn || Build || Share",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, poppins.className)}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
