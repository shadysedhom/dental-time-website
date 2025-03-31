"use client";

import { useState } from "react";
import FormField from "@/components/FormField";

import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {Alert} from "@heroui/alert";

import { siteConfig } from "@/config/site";
import { Building2, Mail, Phone, Send } from "lucide-react";

import emailjs from "emailjs-com";

const BulletPoint = () => (
    <span className="mr-2 inline-block h-2 w-2 rotate-45 border-2 border-black"></span>
);


export default function ContactSection() {

    // Form state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

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
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID as string;
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
            const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

            if (response.status === 200) {
                setAlert({ type: "success", message: "Bericht succesvol verzonden!" });
                form.reset();
            } else {
                setAlert({ type: "danger", message: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het aub later nog eens." });
            }
        }   catch (error) {
                setAlert({ type: "danger", message: "Er is een fout opgetreden bij het verzenden van uw bericht. Probeer het aub later nog eens." });
        }   finally {
                setIsSubmitting(false);
        }
    };
  

    return (
        <section id="contact" className="w-full bg-gray-50 py-16 md:py-24">

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2">

                    {/* Left Column - Contact Information */}
                    <div className="space-y-6 rounded-md p-10 md:p-20 bg-[url('/contact-bg.jpg')] bg-cover bg-center bg-no-repeat">

                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
                            Neem Contact Op
                        </h2>

                        <p className="text-black md:text-lg">
                            Heeft u vragen of wilt u een afspraak maken? Neem gerust contact met ons op. Ons vriendelijke team staat voor u klaar! <br /> <br />
                            Indien u contact met ons op wil nemen kunt u dit doen door middel van dit formulier. Ook zijn we bereikbaar per e-mail en telefoon.
                        </p>

                        {/* Dental Clinic Contact Details */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Building2 className="h-5 w-5 text-black" />
                                <div>
                                    <p className="text-black">Carillonlaan 15</p>
                                    <p className="text-black">3438RC Nieuwegein</p>
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
                    <div className="flex items-center p-8 bg-white">
                        <form className="space-y-6 w-full" onSubmit={handleSubmit}>

                            {/* TODO: Use your 'FormField' to make code less repetitive  /* */ }

                            {/* First & Last Name */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    label="Voornaam"
                                    name="firstName"
                                    placeholder="Voornaam"
                                    required
                                    disabled={isSubmitting}
                                />

                                <FormField
                                    label="Achternaam"
                                    name="lastName"
                                    placeholder="Achternaam"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                                
                            {/* Email & Phone */}
                            <FormField
                                label="E-mailadres"
                                name="email"
                                type="email"
                                placeholder="E-mailadres"
                                required
                                disabled={isSubmitting}
                            />

                            <FormField
                                label="Telefoonnummer"
                                name="phone"
                                type="tel"
                                placeholder="Telefoonnummer"
                                disabled={isSubmitting}
                            />
                            
                                
                            {/* Subject */}
                            <FormField
                                label="Onderwerp"
                                name="subject"
                                placeholder="Onderwerp"
                                required
                                disabled={isSubmitting}
                            />

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Bericht <span className="text-red-500">*</span>
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Uw bericht"
                                    className="min-h-[120px] w-full"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full text-white rounded-md sm:w-auto"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                <Send className="h-4 w-4 text-white" />
                                {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
                            </Button>


                            {/* Success/Error Message */}
                            {alert && (
                                <Alert color={alert.type} title={alert.message} className="mt-4" onClose={() => setAlert(null)} />
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}