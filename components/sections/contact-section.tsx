"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { HoneypotField } from "@/components/spam/honeypot-field";
import { TurnstileWidget } from "@/components/spam/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { identity } from "@/lib/content";
import {
  contactFormSchema,
  contactReasonLabels,
  type ContactFormValues,
} from "@/lib/validations/contact";

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const turnstileTokenRef = useRef<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", reason: undefined, message: "", company: "" },
  });

  const reason = watch("reason");

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: turnstileTokenRef.current }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success("Message sent — I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="border-border scroll-mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact
            </h2>
            <p className="text-muted-foreground mt-4 max-w-sm text-base leading-relaxed">
              Have an opportunity, want to collaborate, or just want to say hi? Send a message, or
              reach out directly.
            </p>
            <a
              href={`mailto:${identity.email}`}
              className="border-border bg-card hover:border-primary/40 focus-visible:outline-ring mt-8 inline-flex items-center gap-3 rounded-xl border p-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span className="bg-accent text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="text-muted-foreground block text-xs">Email me directly</span>
                <span className="text-foreground">{identity.email}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="border-border bg-card shadow-elevated space-y-6 rounded-2xl border p-6 sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-destructive text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-destructive text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select
                  value={reason}
                  onValueChange={(value) =>
                    setValue("reason", value as ContactFormValues["reason"], {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger
                    id="reason"
                    className="w-full"
                    aria-invalid={Boolean(errors.reason)}
                  >
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(contactReasonLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.reason && (
                  <p role="alert" className="text-destructive text-sm">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="text-destructive text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <HoneypotField register={register("company")} />

              <TurnstileWidget
                onVerify={(token) => {
                  turnstileTokenRef.current = token;
                }}
                onExpire={() => {
                  turnstileTokenRef.current = undefined;
                }}
              />

              <Button type="submit" size="lg" disabled={submitting} className="w-full">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
