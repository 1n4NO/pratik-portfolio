"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-lg p-8 text-center bg-surface">
        <p className="font-display text-xl font-bold mb-2">Message sent.</p>
        <p className="text-sm text-ink-soft">Thanks for reaching out — I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" required />
      <div>
        <label htmlFor="message" className="block font-mono text-[11px] tracking-wide text-ink-soft mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm focus-ring resize-none"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-wide rounded px-6 py-3 bg-signal text-paper hover:bg-signal-dark transition-colors focus-ring disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block font-mono text-[11px] tracking-wide text-ink-soft mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded border border-line bg-surface px-3 py-2.5 text-sm focus-ring"
      />
    </div>
  );
}
