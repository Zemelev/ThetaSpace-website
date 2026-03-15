// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "ThetaSpace ",
    template: "%s | ThetaSpace",
  },
  description: "Щоденний клуб, лекції від експертів та курси для початківців. Приєднуйтесь до спільноти, де кожен знайде собі співрозмовника.",
  keywords: "клуб спілкування, лекції, курси, ментори, психологія, розвиток, жива розмова, комунікація, ThetaSpace",
  authors: [{ name: "ThetaSpace" }],
  openGraph: {
    title: "ThetaSpace | Простір для живого спілкування",
    description: "Щоденний клуб, лекції від експертів та курси для початківців",
    url: "https://www.theta-space.org",
    siteName: "ThetaSpace",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ThetaSpace - простір для живого спілкування",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThetaSpace | Простір для живого спілкування",
    description: "Щоденний клуб, лекції від експертів та курси для початківців",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Додамо пізніше
  },
  alternates: {
    canonical: "https://www.theta-space.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}