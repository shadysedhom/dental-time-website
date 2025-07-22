"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { Building2, Mail, Phone, Send } from "lucide-react";
import emailjs from "emailjs-com";

import { siteConfig } from "@/config/site";
import FormField from "@/components/FormField";

const BulletPoint = () => (
  <span className="mr-2 inline-block h-2 w-2 rotate-45 border-2 border-black" />
);

export default function ContactSection() {
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlert(null); // Reset alert state

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // EmailJS configuration
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateID = process.env
      .NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

    // Get form data
    const templateParams = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    };

    // Send contact message using EmailJS
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
            "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het aub later nog eens.",
        });
      }
    } catch (error) {
      setAlert({
        type: "danger",
        message:
          "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het aub later nog eens.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24" id="contact">
      <div className="container mx-auto md:px-6">
        <div className="grid lg:grid-cols-2">
          {/* Left Column - Contact Information */}
          <div className="space-y-6 rounded-md p-6 md:p-20 bg-[url('/contact-bg.jpg')] bg-cover bg-center bg-no-repeat">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
              Neem Contact Op
            </h2>

            <p className="text-black md:text-lg">
              Heeft u vragen of wilt u een afspraak maken? Neem gerust contact
              met ons op. Ons vriendelijke team staat voor u klaar! <br />{" "}
              <br />
              Indien u contact met ons op wil nemen kunt u dit doen door middel
              van dit formulier. Ook zijn we bereikbaar per e-mail en telefoon.
            </p>

            {/* Dental Clinic Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-black" />
                <div>
                  <p className="text-black">Waardijnburg 3</p>
                  <p className="text-black">3437 AR Nieuwegein</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-black" />
                <p className="text-black">+31 30 604 9005</p>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-black" />
                <p className="text-black">info@dental-time.nl</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-4">
              <h2 className="font-bold text-lg">Openingstijden</h2>

              {siteConfig.openingTimes.map((item, index) => (
                <p key={`${item.day}-${index}`} className="flex items-center">
                  <BulletPoint /> {item.day}: {item.time}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex items-center p-6 md:p-8 bg-white">
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>

              {/* First & Last Name */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  required
                  disabled={isSubmitting}
                  label="Voornaam"
                  name="firstName"
                  placeholder="Voornaam"
                />

                <FormField
                  required
                  disabled={isSubmitting}
                  label="Achternaam"
                  name="lastName"
                  placeholder="Achternaam"
                />
              </div>

              {/* Email & Phone */}
              <FormField
                required
                disabled={isSubmitting}
                label="E-mailadres"
                name="email"
                placeholder="E-mailadres"
                type="email"
              />

              <FormField
                disabled={isSubmitting}
                label="Telefoonnummer"
                name="phone"
                placeholder="Telefoonnummer"
                type="tel"
              />

              {/* Subject */}
              <FormField
                required
                disabled={isSubmitting}
                label="Onderwerp"
                name="subject"
                placeholder="Onderwerp"
              />

              {/* Message */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="message"
                >
                  Bericht <span className="text-red-500">*</span>
                </label>
                <Textarea
                  required
                  className="min-h-[120px] w-full"
                  disabled={isSubmitting}
                  id="message"
                  name="message"
                  placeholder="Uw bericht"
                />
              </div>

              {/* Submit Button */}
              <Button
                className="w-full text-white rounded-md sm:w-auto"
                color="primary"
                disabled={isSubmitting}
                type="submit"
              >
                <Send className="h-4 w-4 text-white" />
                {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
              </Button>

              {/* Success/Error Message */}
              {alert && (
                <Alert
                  className="mt-4"
                  color={alert.type}
                  title={alert.message}
                  onClose={() => setAlert(null)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
