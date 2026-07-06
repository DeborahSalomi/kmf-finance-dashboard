import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { DataProvider } from "@/components/data-context";

const inter = Inter({ subsets: ["latin"] });

// 1. Consolidated Metadata
export const metadata: Metadata = {
  title: "Financial Decision Support Dashboard",
  description: "MBA Finance Architecture",
  manifest: "/manifest.json",
};

// 2. Consolidated Viewport
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-zinc-100 antialiased`}>
        <DataProvider>
          <div className="flex min-h-screen">
            {/* Global Sidebar */}
            <Sidebar /> 
            
            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto bg-black bg-grid-zinc-900/[0.04]">
              <div className="max-w-7xl mx-auto space-y-8">
                {children}
              </div>
            </main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}