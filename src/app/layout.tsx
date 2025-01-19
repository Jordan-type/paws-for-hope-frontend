import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import InvalidRouteRedirect from "@/components/Navigation/InvalidRouteRedirect";
import Navbar from "@/components/Navigation/Navbar";
import Providers from "@/Providers/Providers";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paws for Hope",
  description: "A Community App made for those who care about pets and want to participate and work for their betterment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <InvalidRouteRedirect />
            {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
