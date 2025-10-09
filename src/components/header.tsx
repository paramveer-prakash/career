import Link from "next/link";
import { routes } from "@/lib/config";

export function Header(){
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={routes.resumes} className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <span className="font-sora font-bold text-xl text-gray-900">Career</span>
            <p className="text-xs text-gray-500 -mt-1">Resume Builder</p>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link 
            href={routes.resumes} 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Resumes
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link 
            href="/settings" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
          >
            Settings
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}


