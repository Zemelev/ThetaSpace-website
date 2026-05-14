import type { Metadata } from "next";
import StaticMarkup from "@/components/StaticMarkup";
import { ABOUT_HTML } from "@/lib/static-pages";

export const metadata: Metadata = {
  title: "Про нас",
  description: "Theta Space, місце, де накопичуються сенси.",
};

export default function AboutPage() {
  return <StaticMarkup html={ABOUT_HTML} />;
}
