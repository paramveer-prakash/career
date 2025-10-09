import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OIDCAuthProvider } from "@/components/providers/oidc-auth-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Header } from "@/components/header";
// Initialize custom templates
import "@/lib/templates";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Career – Resume Manager",
  description: "Upload, parse, and edit resumes with a modern, structured editor.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html { background-color: white !important; }
            body { background-color: white !important; }
            * { background-color: transparent; }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-white">
        <OIDCAuthProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </AuthProvider>
        </OIDCAuthProvider>
      </body>
    </html>
  );
}