"use client";

import { useEffect } from "react";

type StaticMarkupProps = {
  html: string;
};

export default function StaticMarkup({ html }: StaticMarkupProps) {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    revealItems.forEach((item) => item.classList.add("is-visible"));

    const tabRoots = Array.from(document.querySelectorAll<HTMLElement>("[data-tabs]"));
    const cleanups = tabRoots.map((root) => {
      const onClick = (event: MouseEvent) => {
        const trigger = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-tab]");
        if (!trigger || !root.contains(trigger)) return;

        const tab = trigger.dataset.tab;
        if (!tab) return;

        root.querySelectorAll("[data-tab]").forEach((button) => {
          button.classList.toggle("is-active", button === trigger);
        });
        root.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
          panel.classList.toggle("is-active", panel.dataset.panel === tab);
        });
      };

      root.addEventListener("click", onClick);
      return () => root.removeEventListener("click", onClick);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [html]);

  return (
    <main
      className="static-page"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
