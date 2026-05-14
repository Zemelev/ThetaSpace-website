import type { Metadata } from "next";
import StaticMarkup from "@/components/StaticMarkup";
import { LECTURES_HTML } from "@/lib/static-pages";

export const metadata: Metadata = {
  title: "Лекції",
  description: "Живі зустрічі Theta Space про те, як працює людина.",
};

export default function LecturesPage() {
  return <StaticMarkup html={LECTURES_HTML} />;
}
