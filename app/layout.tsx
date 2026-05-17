import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projectpedia",
  description: "Project documentation hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--content-bg)] text-[var(--text-primary)]">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
