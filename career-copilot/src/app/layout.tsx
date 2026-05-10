import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Career Copilot | Your Intelligent Career Partner",
  description: "AI-powered career platform for students. Resume analysis, internship matching, mock interviews, and gravity score to track your job orbit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
