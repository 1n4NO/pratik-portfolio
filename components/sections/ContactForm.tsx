"use client";

import { DisabledContactOverlay } from "@/components/ui/DisabledContactOverlay";
import type { FormEvent } from "react";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="relative max-w-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-5" aria-disabled="true">
        <fieldset disabled className="space-y-5 opacity-45">
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

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-wide rounded px-6 py-3 bg-signal text-paper transition-colors focus-ring disabled:opacity-50"
          >
            Send message
          </button>
        </fieldset>
      </form>
      <DisabledContactOverlay />
    </div>
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
