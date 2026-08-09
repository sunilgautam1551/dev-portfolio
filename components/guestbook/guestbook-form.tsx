"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { HoneypotField } from "@/components/spam/honeypot-field";
import { TurnstileWidget } from "@/components/spam/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { guestbookFormSchema, type GuestbookFormValues } from "@/lib/validations/guestbook";

export function GuestbookForm() {
  const [submitting, setSubmitting] = useState(false);
  const turnstileTokenRef = useRef<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GuestbookFormValues>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: { name: "", message: "", company: "" },
  });

  async function onSubmit(values: GuestbookFormValues) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: turnstileTokenRef.current }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      toast.success("Thanks! Your note is awaiting moderation.");
      reset();
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="guestbook-name">Name</Label>
        <Input
          id="guestbook-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "guestbook-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="guestbook-name-error" role="alert" className="text-destructive text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="guestbook-message">Message</Label>
        <Textarea
          id="guestbook-message"
          rows={3}
          maxLength={280}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "guestbook-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="guestbook-message-error" role="alert" className="text-destructive text-sm">
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

      <Button type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Sign the guestbook
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
