import Link from "next/link";
import { routes } from "@/lib/config";

export function Header(){
  return (
    <header className="sticky top-0 z-30 border-b border-gray-800/40 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400" />
          <Link href={routes.home} className="font-semibold tracking-tight">Career</Link>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link href={routes.resumes} className="text-gray-300 hover:text-white">Resumes</Link>
          <Link href="/settings" className="text-gray-300 hover:text-white">Settings</Link>
        </nav>
      </div>
    </header>
  );
}


