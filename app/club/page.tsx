import type { Metadata } from "next";
import StaticMarkup from "@/components/StaticMarkup";
import { CLUB_HTML } from "@/lib/static-pages";

export const metadata: Metadata = {
  title: "Клуб",
  description: "Спільнота здібних людей, які стають ще здібнішими.",
};

export default function ClubPage() {
  return <StaticMarkup html={CLUB_HTML} />;
}
