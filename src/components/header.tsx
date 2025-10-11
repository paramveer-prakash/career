import Link from "next/link";
import { routes } from "@/lib/config";

export function Header(){
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <Link href={routes.overview} className="flex items-center gap-4 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div>
            <span className="font-sora font-bold text-2xl text-slate-900 tracking-tight">Career</span>
            <p className="text-sm text-slate-500 -mt-1 font-medium">Professional Resume Builder</p>
          </div>
        </Link>
        <nav className="flex items-center gap-8">
          <Link 
            href={routes.overview} 
            className="text-slate-700 hover:text-sky-600 font-semibold transition-all duration-200 relative group px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            <span className="relative z-10">Overview</span>
            <span className="absolute inset-0 bg-sky-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </Link>
          <Link 
            href={routes.resumes} 
            className="text-slate-700 hover:text-sky-600 font-semibold transition-all duration-200 relative group px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            <span className="relative z-10">All Resumes</span>
            <span className="absolute inset-0 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </Link>
          <Link 
            href="/settings" 
            className="text-slate-700 hover:text-sky-600 font-semibold transition-all duration-200 relative group px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            <span className="relative z-10">Settings</span>
            <span className="absolute inset-0 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}


