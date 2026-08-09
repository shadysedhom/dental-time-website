import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Lees hoe Dental Time in Nieuwegein omgaat met persoonsgegevens en gegevens uit het online inschrijfformulier.",
  alternates: {
    canonical: "/privacyverklaring",
  },
};

export default function PrivacyVerklaringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
}
