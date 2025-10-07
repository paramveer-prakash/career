import Link from "next/link";
import { routes } from "@/lib/config";

export function Header(){
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={routes.resumes} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-cyan-400" />
            <span className="font-semibold tracking-tight">Career</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={routes.resumes} className="text-gray-700 hover:text-gray-900">Resumes</Link>
          <Link href="/settings" className="text-gray-700 hover:text-gray-900">Settings</Link>
        </nav>
      </div>
    </header>
  );
}


