"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Alert } from "@heroui/react";
import { Building2, Clock3, Mail, Phone, Send } from "lucide-react";
import emailjs from "emailjs-com";

import { siteConfig } from "@/config/site";
import FormField from "@/components/FormField";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setAlert(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateID = process.env
      .NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

    const templateParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey,
      );

      if (response.status === 200) {
        setAlert({ type: "success", message: "Bericht succesvol verzonden!" });
        form.reset();
      } else {
        setAlert({
          type: "danger",
          message:
            "Er ging iets mis bij het verzenden. Probeer het later nog eens.",
        });
      }
    } catch {
      setAlert({
        type: "danger",
        message:
          "Er ging iets mis bij het verzenden. Probeer het later nog eens.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f6f0e6] px-4 py-20 sm:px-6 lg:py-28" id="contact">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#b88e32]/20 bg-white shadow-[0_24px_70px_rgba(17,24,43,0.08)]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-[#11182b] p-7 text-white sm:p-10 lg:p-14">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#d7b45a]/15" />
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#d7b45a]/20" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#efd897]">
                Contact
              </p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                We helpen u graag verder
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
                Heeft u een vraag of wilt u een afspraak maken? Neem gerust
                contact op met onze praktijk in Nieuwegein.
              </p>

              <div className="mt-9 space-y-4">
                <a
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                  href="tel:0306049005"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7b45a]/15 text-[#efd897]">
                    <Phone aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/50">
                      Telefoon
                    </span>
                    <span className="mt-1 block font-semibold">
                      030 604 9005
                    </span>
                  </span>
                </a>

                <a
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                  href="mailto:info@dental-time.nl"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7b45a]/15 text-[#efd897]">
                    <Mail aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/50">
                      E-mail
                    </span>
                    <span className="mt-1 block font-semibold">
                      info@dental-time.nl
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7b45a]/15 text-[#efd897]">
                    <Building2 aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-[0.14em] text-white/50">
                      Praktijk
                    </span>
                    <span className="mt-1 block font-semibold">
                      Waardijnburg 3, 3437 AR Nieuwegein
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                  <Clock3
                    aria-hidden="true"
                    className="h-5 w-5 text-[#efd897]"
                  />
                  Openingstijden
                </h3>
                <dl className="mt-5 space-y-3 text-sm">
                  {siteConfig.openingTimes.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between gap-6 border-b border-white/5 pb-3"
                    >
                      <dt className="text-white/60">{item.day}</dt>
                      <dd className="font-medium text-white/90">{item.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-[#fffdf9] p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9a752b]">
              Stuur een bericht
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-[#11182b] sm:text-4xl">
              Waarmee kunnen we u helpen?
            </h3>
            <p className="mt-3 max-w-xl leading-7 text-slate-600">
              Vul het formulier in. We nemen zo snel mogelijk contact met u op.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  required
                  autoComplete="given-name"
                  disabled={isSubmitting}
                  label="Voornaam"
                  name="firstName"
                  placeholder="Voornaam"
                />
                <FormField
                  required
                  autoComplete="family-name"
                  disabled={isSubmitting}
                  label="Achternaam"
                  name="lastName"
                  placeholder="Achternaam"
                />
              </div>

              <FormField
                required
                autoComplete="email"
                disabled={isSubmitting}
                label="E-mailadres"
                name="email"
                placeholder="E-mailadres"
                type="email"
              />
              <FormField
                autoComplete="tel"
                disabled={isSubmitting}
                label="Telefoonnummer"
                name="phone"
                placeholder="Telefoonnummer"
                type="tel"
              />
              <FormField
                required
                disabled={isSubmitting}
                label="Onderwerp"
                name="subject"
                placeholder="Onderwerp"
              />

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-700"
                  htmlFor="message"
                >
                  Bericht <span className="text-red-500">*</span>
                </label>
                <Textarea
                  required
                  className="min-h-[140px] w-full"
                  classNames={{ inputWrapper: "min-h-[140px] bg-white" }}
                  disabled={isSubmitting}
                  id="message"
                  name="message"
                  placeholder="Uw bericht"
                  radius="sm"
                  size="lg"
                />
              </div>

              <Button
                className="min-h-12 w-full rounded-xl border border-[#b88e32] bg-[#d7b45a] px-6 font-bold text-[#11182b] shadow-[0_10px_24px_rgba(177,138,54,0.2)] transition-colors hover:bg-[#e2c269] sm:w-auto"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
                {isSubmitting ? "Verzenden..." : "Verstuur bericht"}
              </Button>

              {alert ? (
                <Alert
                  className="mt-4"
                  color={alert.type}
                  title={alert.message}
                  onClose={() => setAlert(null)}
                />
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
