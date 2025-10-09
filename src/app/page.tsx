'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'react-oidc-context'
import { PrimaryButton } from '@/components/ui/button'
import { Shield, Zap } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated, isLoading, signinRedirect, user } = useAuth()
  const router = useRouter()

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
    <div className="min-h-full bg-white">

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build better resumes faster
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Upload, parse, and edit your resumes section-by-section with a clean, structured editor.
            </p>
          </div>

          <div className="mb-12">
            <PrimaryButton
              onClick={() => signinRedirect()}
              size="lg"
              className="text-lg px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              Get Started
            </PrimaryButton>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            <div className="text-left p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast uploads
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload multiple resumes (PDF/DOC/DOCX/TXT) and parse them into structured data.
              </p>
            </div>

            <div className="text-left p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Structured editor
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Edit primary info, skills, work experience, and education with dedicated CRUD.
              </p>
            </div>

            <div className="text-left p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with enterprise-grade authentication (AWS Cognito).
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-gray-600">
            <p className="font-medium">© 2025 Career.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}