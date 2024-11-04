import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header"; // Adjust the path if necessary
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  weight: ["400", "700"], // Specify the font weights
  subsets: ["latin"], // Specify the language subsets
});

export const metadata: Metadata = {
  title: "CISSA x MAC: The Heist",
  description: "Welcome to the CISSA x MAC Heist!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} antialiased min-h-screen`}>
        {/* Background Image */}
        {/* Removing temporarily for MVP */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg1.png')",
            filter: "brightness(0.6)",
            zIndex: -1,
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(to bottom, #030026, #130026, #240236, #571c65, #671c65, #771c65, #dc4e84)",
          }}
        ></div>

        {/* Header */}
        <Header />

        {/* Container for main content with padding */}
        <main className="space-y-8">{children}</main>
      </body>
    </html>
  );
}
