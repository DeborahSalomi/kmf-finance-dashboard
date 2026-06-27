import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KMF Financial Analytics",
  description: "MBA Finance Internship Portfolio Dashboard",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex h-screen overflow-hidden bg-black`}>
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto relative z-0 bg-black">
          {/* Dot Matrix Grid */}
          <div className="absolute inset-0 z-0 bg-grid-pattern opacity-50" />
          
          {/* Top-Down Emerald Glow */}
          <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-black to-black" />
          
          {/* Content Wrapper */}
          <div className="relative z-10 p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}