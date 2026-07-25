"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { MessageCircle, X } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      firstFieldRef.current?.focus();
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open contact form"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-signal text-paper flex items-center justify-center shadow-[0_4px_16px_rgba(54,82,224,0.35)] hover:bg-signal-dark transition-colors focus-ring"
      >
        <MessageCircle size={22} aria-hidden="true" />
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
            className="w-full max-w-md bg-paper rounded-lg border border-line shadow-[0_20px_60px_rgba(20,23,31,0.25)] max-h-[90vh] overflow-y-auto"
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
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {status === "success" ? (
              <div className="px-6 py-10 text-center">
                <p className="font-display text-lg font-bold mb-2">Message sent.</p>
                <p className="text-sm text-ink-soft mb-6">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setOpen(false);
                    setStatus("idle");
                  }}
                  className="font-mono text-[12px] text-signal hover:text-signal-dark focus-ring rounded"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <Field
                  label="Name"
                  name="name"
                  inputRef={(node) => {
                    firstFieldRef.current = node;
                  }}
                  required
                />
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

                {status === "error" && (
                  <p role="alert" className="text-sm text-danger">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 font-mono text-[12px] tracking-wide rounded px-5 py-3 bg-signal text-paper hover:bg-signal-dark transition-colors focus-ring disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
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
  inputRef,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  inputRef?: (node: HTMLInputElement | null) => void;
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
        ref={inputRef}
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded border border-line bg-surface px-3 py-2 text-sm focus-ring"
      />
    </div>
  );
}
