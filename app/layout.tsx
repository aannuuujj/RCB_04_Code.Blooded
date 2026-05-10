import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Career Copilot",
  description: "Your AI-powered career partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-brand-white font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
      </body>
    </html>
  );
}
