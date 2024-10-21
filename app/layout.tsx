import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header"; // Adjust the path if necessary

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "CISSA x MAC Puzzle",
  description: "Puzzle!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/main-bg.jpeg')",
            filter: "brightness(0.7)",
            zIndex: -1,
            width: "100vw",
            height: "100vh",
          }}
        ></div>

        {/* Header */}
        <Header />

        {/* Container for main content with padding */}
        <main className="px-6 py-4 space-y-8">
          {children}
        </main>
      </body>
    </html>
  );
}
