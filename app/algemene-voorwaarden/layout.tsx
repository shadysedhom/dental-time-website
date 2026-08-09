import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "Lees de algemene voorwaarden van tandartspraktijk Dental Time in Nieuwegein.",
  alternates: {
    canonical: "/algemene-voorwaarden",
  },
};

export default function AlgemeneVoorwaardenLayout({
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
