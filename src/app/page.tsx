'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'react-oidc-context'
import { PrimaryButton } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated, isLoading, signinRedirect, user } = useAuth()
  const router = useRouter()
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    // Check for existing authentication immediately
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/resumes')
      } else {
        // Try to get user if there might be a valid session
        const storedAuth = localStorage.getItem('auth-store');
        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            if (parsedAuth.state?.isAuthenticated && parsedAuth.state?.access_token) {
              // There's stored auth, let's wait a bit for OIDC to potentially restore the session
              const timeout = setTimeout(() => {
                if (!isAuthenticated) {
                  // If still not authenticated after waiting, clear stored auth
                  localStorage.removeItem('auth-store');
                }
              }, 2000);
              return () => clearTimeout(timeout);
            }
          } catch {
            localStorage.removeItem('auth-store');
          }
        }
      }
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-6xl sm:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              Build better resumes
              <span className="block bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                faster
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Upload, parse, and edit your resumes section-by-section with a clean, structured editor powered by AI.
            </p>
          </div>

          <div className="mb-16">
            <PrimaryButton
              onClick={async () => {
                setSigningIn(true);
                try {
                  await signinRedirect();
                } catch (error) {
                  console.error('Sign in error:', error);
                  setSigningIn(false);
                }
              }}
              loading={signingIn}
              loadingText="Signing in..."
              size="xl"
              className="text-xl px-12 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl"
            >
              Get Started
            </PrimaryButton>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-left p-8 rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Fast Uploads
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Upload multiple resumes (PDF/DOC/DOCX/TXT) and parse them into structured data instantly.
              </p>
            </div>

            <div className="text-left p-8 rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Structured Editor
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Edit primary info, skills, work experience, and education with dedicated CRUD operations.
              </p>
            </div>

            <div className="text-left p-8 rounded-3xl border border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Secure & Private
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Your data is protected with enterprise-grade authentication and encryption (AWS Cognito).
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-gray-600">
            <p className="font-medium">© 2025 Career - Professional Resume Builder</p>
          </div>
        </div>
      </footer>
    </div>
  )
}