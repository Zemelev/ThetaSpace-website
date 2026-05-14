"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const endpoint = process.env.NEXT_PUBLIC_WP_REST_URL
  ? `${process.env.NEXT_PUBLIC_WP_REST_URL}/liveclub/v1/submit`
  : "";

export default function SignupModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const open = (context = "") => {
      if (eventRef.current) eventRef.current.value = context;
      modalRef.current?.classList.add("is-open");
      modalRef.current?.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    };

    const close = () => {
      modalRef.current?.classList.remove("is-open");
      modalRef.current?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      setStatus("");
      setStatusType("idle");
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const opener = target.closest<HTMLElement>("[data-modal-open]");
      if (opener) {
        event.preventDefault();
        open(opener.dataset.context || "");
        return;
      }

      if (target.closest("[data-modal-close]") || target === modalRef.current) {
        event.preventDefault();
        close();
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      additional_info: [
        String(formData.get("message") || ""),
        String(formData.get("event") || ""),
      ].filter(Boolean).join("\n\n"),
      type: "modal",
      source: "theta-space-next",
    };

    if (!endpoint) {
      setStatus("Форма готова, але NEXT_PUBLIC_WP_REST_URL не налаштовано.");
      setStatusType("error");
      return;
    }

    setSubmitting(true);
    setStatus("Надсилаємо заявку...");
    setStatusType("idle");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submit failed");

      form.reset();
      setStatus("Дякуємо. Ми зв'яжемося з вами найближчим часом.");
      setStatusType("success");
    } catch {
      setStatus("Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам в Instagram.");
      setStatusType("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="modal"
      id="signupModal"
      role="dialog"
      aria-labelledby="signupTitle"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-card">
        <button className="modal-close" data-modal-close aria-label="Закрити" type="button">
          ×
        </button>
        <span className="eyebrow no-line">Заявка</span>
        <h3 id="signupTitle" style={{ marginTop: "0.8rem" }}>Залиште свої контакти</h3>
        <p className="modal-sub">
          Ми зв'яжемося з вами впродовж робочого дня та підкажемо найкращий формат.
        </p>

        <form className="lead-form" data-form-type="Заявка з модального вікна" onSubmit={onSubmit}>
          <input type="hidden" name="event" value="" ref={eventRef} readOnly />
          <div className="field">
            <label htmlFor="m-name">Ім'я *</label>
            <input id="m-name" name="name" type="text" required placeholder="Як до вас звертатися?" />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="m-phone">Телефон *</label>
              <input id="m-phone" name="phone" type="tel" required placeholder="+380..." />
            </div>
            <div className="field">
              <label htmlFor="m-email">Telegram / Email</label>
              <input id="m-email" name="email" type="text" placeholder="@username або email" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="m-message">Що вас цікавить?</label>
            <textarea id="m-message" name="message" placeholder="Кілька слів про ваш запит, необов'язково" />
          </div>
          <div className={`form-status${statusType !== "idle" ? ` is-${statusType}` : ""}`} aria-live="polite">
            {status}
          </div>
          <button
            type="submit"
            className="btn btn--primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
            disabled={submitting}
          >
            {submitting ? "Надсилаємо..." : "Надіслати заявку"}
          </button>
          <p className="form-fine-print">
            Натискаючи «Надіслати», ви погоджуєтесь, що ми зв'яжемося з вами у Telegram або телефоном.
          </p>
        </form>
      </div>
    </div>
  );
}
