import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "StoryTeller AI",
  description: "Experience the magic of AI-driven storytelling with custom tales that engage and inspire readers of all ages.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Header />
        {children}
        <Toaster duration={8000} position="bottom-left" />
      </body>
    </html>
  );
}
