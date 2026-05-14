import type { Metadata } from "next";
import StaticMarkup from "@/components/StaticMarkup";
import { MENTORS_HTML } from "@/lib/static-pages";

export const metadata: Metadata = {
  title: "Ментори",
  description: "Команда одиторів Theta Space.",
};

export default function MentorsPage() {
  return <StaticMarkup html={MENTORS_HTML} />;
}
