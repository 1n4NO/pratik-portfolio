"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";
import { DisabledContactOverlay } from "@/components/ui/DisabledContactOverlay";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open contact form"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-paper shadow-card transition-colors hover:bg-signal-dark focus-ring"
      >
        <MessageCircle size={22} className="icon-current" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="w-full max-w-md bg-paper rounded-lg border border-line shadow-overlay max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-line">
              <h2 id="contact-modal-title" className="font-display text-lg font-bold">
                Say hello
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-ink-soft hover:text-ink focus-ring rounded"
              >
                <X size={20} className="icon-amber" aria-hidden="true" />
              </button>
            </div>

            <div className="relative">
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4" aria-disabled="true">
                <fieldset disabled className="space-y-4 opacity-45">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Subject" name="subject" required />
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[11px] tracking-wide text-ink-soft mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full rounded border border-line bg-surface px-3 py-2 text-sm focus-ring resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded bg-signal px-5 py-3 font-mono text-[12px] tracking-wide text-paper transition-colors hover:bg-signal-dark focus-ring disabled:opacity-50"
                  >
                    Send message
                  </button>
                </fieldset>
              </form>
              <DisabledContactOverlay />
            </div>
          </div>
        </div>
      )}
    </>
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
      <label
        htmlFor={name}
        className="block font-mono text-[11px] tracking-wide text-ink-soft mb-1.5"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded border border-line bg-surface px-3 py-2 text-sm focus-ring"
      />
    </div>
  );
}
