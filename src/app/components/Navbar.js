"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/" className="hover:text-blue-200 transition">
              User Management
            </Link>
          </div>
          <div className="space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded transition ${
                pathname === "/" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/add-user"
              className={`px-3 py-2 rounded transition ${
                pathname === "/add-user" ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
            >
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
