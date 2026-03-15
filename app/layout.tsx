// app/layout.tsx
import type { Metadata } from "next";
import { Space_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Theta Space",
    template: "%s | Theta Space",
  },
  description:
    "Школа життя та живого спілкування у серці Києва. Клуб, лекції, курси та Self Upgrade. Гончара 15/3.",
  keywords:
    "клуб спілкування, лекції, курси, ментори, Self Upgrade, ProLab, ThetaSpace, Київ, Гончара, живе спілкування",
  authors: [{ name: "Theta Space" }],
  openGraph: {
    title: "Theta Space | Школа живого спілкування",
    description:
      "Простір для тих, хто шукає справжнє спілкування та розвиток. Гончара 15/3, Київ.",
    url: "https://www.theta-space.org",
    siteName: "Theta Space",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Theta Space — школа живого спілкування, Київ",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theta Space | Школа живого спілкування",
    description: "Простір для тих, хто шукає справжнє спілкування. Київ.",
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
    <html
      lang="uk"
      className={`${spaceMono.variable} ${bebasNeue.variable}`}
    >
      <body suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}