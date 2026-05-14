import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignupModal from "@/components/forms/SignupModal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theta-space.org"),
  title: {
    default: "Theta Space",
    template: "%s | Theta Space",
  },
  description:
    "Клуб живого спілкування у серці Києва. Лекції, курси, ментори та простір для справжнього контакту.",
  keywords:
    "клуб спілкування, лекції, курси, ментори, Self Upgrade, ProLab, Theta Space, Київ, Гончара 15/3",
  authors: [{ name: "Theta Space" }],
  openGraph: {
    title: "Theta Space | Клуб живого спілкування",
    description:
      "Простір для тих, хто шукає справжнє спілкування та розвиток. Гончара 15/3, Київ.",
    url: "https://www.theta-space.org",
    siteName: "Theta Space",
    images: [
      {
        url: "/theta-static/assets/засновники.jpg",
        width: 1200,
        height: 630,
        alt: "Theta Space, клуб живого спілкування, Київ",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theta Space | Клуб живого спілкування",
    description: "Простір для тих, хто шукає справжнє спілкування. Київ.",
    images: ["/theta-static/assets/засновники.jpg"],
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
    <html lang="uk">
      <body suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <SignupModal />
      </body>
    </html>
  );
}
