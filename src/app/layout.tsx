import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata: Metadata = {
  metadataBase: new URL("https://traveltrucks-phi.vercel.app"), 
  title: {
    template: "%s | TravelTrucks",
    default: "TravelTrucks | Rent Campers of Your Dreams",
  },
   description: "Find and book the perfect campervan for your next road trip adventure. Browse our catalog of modern campers.",
  icons: {
    icon: "/favicon.png", 
   
  },
  openGraph: {
    title: "TravelTrucks | Campervan Rentals",
    description: "Find and book the perfect campervan for your next road trip adventure.",
    url: "https://your-domain.com", 
    siteName: "TravelTrucks",
    images: [
      {
        url: "/hero.jpg", 
        width: 1200,
        height: 630,
        alt: "TravelTrucks Hero Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelTrucks | Campervan Rentals",
    description: "Find and book the perfect campervan for your next road trip adventure.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <Toaster />
          <Header/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
