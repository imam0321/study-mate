import Link from "next/link";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";


export default function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <h1 className="text-2xl font-semibold">Study Mate</h1>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}