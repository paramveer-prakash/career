import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { OIDCAuthProvider } from "@/components/providers/oidc-auth-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Header } from "@/components/header";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <OIDCAuthProvider>
          <AuthProvider>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-6">
              {children}
            </main>
          </AuthProvider>
        </OIDCAuthProvider>
      </body>
    </html>
  );
}