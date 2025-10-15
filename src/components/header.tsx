'use client';

import Link from "next/link";
import { routes } from "@/lib/config";
import { useAuthStore } from "@/stores/auth-store";
import { useState } from "react";

export function Header(){
  const { user, isAuthenticated, signOutRedirect } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = () => {
    signOutRedirect();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
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
        
        <div className="flex items-center gap-8">
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
              <span className="relative z-10">My Resumes</span>
              <span className="absolute inset-0 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            </Link>
            <Link 
              href={routes.templates} 
              className="text-slate-700 hover:text-sky-600 font-semibold transition-all duration-200 relative group px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              <span className="relative z-10">Templates</span>
              <span className="absolute inset-0 bg-slate-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            </Link>
          </nav>

          {/* User Avatar */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {getInitials(user.name)}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <svg 
                  className={`w-4 h-4 text-slate-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl border border-slate-200 py-2 z-50"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}


