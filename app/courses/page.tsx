import type { Metadata } from "next";
import StaticMarkup from "@/components/StaticMarkup";
import { COURSES_HTML } from "@/lib/static-pages";

export const metadata: Metadata = {
  title: "Курси",
  description: "Два практичні курси Self Upgrade у Theta Space.",
};

export default function CoursesPage() {
  return <StaticMarkup html={COURSES_HTML} />;
}
