import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MapPin, Phone } from "lucide-react";

import StructuredData from "@/components/StructuredData";
import { businessConfig } from "@/config/site";
import { getTreatment, treatments } from "@/config/treatments";

type TreatmentPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);

  if (!treatment) {
    return {};
  }

  const path = `/behandelingen/${treatment.slug}`;

  return {
    title: `${treatment.name} in Nieuwegein`,
    description: treatment.metaDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${treatment.name} in Nieuwegein | Dental Time`,
      description: treatment.metaDescription,
      url: `${businessConfig.url}${path}`,
      images: ["/clinic-dental-time.jpeg"],
      locale: "nl_NL",
      siteName: businessConfig.name,
      type: "website",
    },
  };
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { slug } = await params;
  const treatment = getTreatment(slug);

  if (!treatment) {
    notFound();
  }

  const pageUrl = `${businessConfig.url}/behandelingen/${treatment.slug}`;
  const relatedTreatments = treatment.relatedSlugs
    .map((relatedSlug) => getTreatment(relatedSlug))
    .filter((item) => item !== undefined);
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${treatment.name} in Nieuwegein`,
        description: treatment.metaDescription,
        inLanguage: "nl-NL",
        isPartOf: {
          "@id": `${businessConfig.url}/#website`,
        },
        about: {
          "@type": "Service",
          name: treatment.name,
          areaServed: "Nieuwegein",
          provider: {
            "@id": `${businessConfig.url}/#dental-practice`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: businessConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Behandelingen",
            item: `${businessConfig.url}/behandelingen`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: treatment.name,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="pb-20 pt-10 text-[#11182b] sm:pt-16">
      <StructuredData data={pageSchema} />
      <nav aria-label="Broodkruimel" className="text-sm text-slate-500">
        <Link className="transition hover:text-primary" href="/">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <Link className="transition hover:text-primary" href="/behandelingen">
          Behandelingen
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page">{treatment.name}</span>
      </nav>

      <header className="mt-8 grid gap-8 border-b border-[#ded8cc] pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a752b]">
            {treatment.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
            {treatment.name} in Nieuwegein
          </h1>
        </div>
        <p className="text-lg leading-8 text-slate-600">
          {treatment.shortDescription} U bent welkom bij Dental Time op het
          Muntplein in Nieuwegein.
        </p>
      </header>

      <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <section aria-labelledby="intro-heading">
            <h2
              className="font-serif text-3xl font-semibold sm:text-4xl"
              id="intro-heading"
            >
              Persoonlijke zorg en duidelijke uitleg
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600">
              {treatment.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="indications-heading" className="mt-14">
            <h2
              className="font-serif text-3xl font-semibold"
              id="indications-heading"
            >
              {treatment.indicationsTitle}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {treatment.indications.map((indication) => (
                <li
                  key={indication}
                  className="flex gap-3 rounded-2xl border border-[#e0dbd1] bg-[#fbfaf7] p-5 leading-7 text-slate-700"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 flex-none text-[#9a752b]"
                  />
                  {indication}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="approach-heading" className="mt-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a752b]">
              Zo werken we
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-semibold"
              id="approach-heading"
            >
              Een rustige aanpak in drie stappen
            </h2>
            <ol className="mt-7 grid gap-5 md:grid-cols-3">
              {treatment.approach.map((step, index) => (
                <li key={step.title} className="border-t border-[#b18a36] pt-5">
                  <span className="font-serif text-sm font-semibold text-[#9a752b]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="h-fit rounded-3xl bg-[#24366f] p-7 text-white shadow-[0_20px_55px_rgba(36,54,111,0.17)] lg:sticky lg:top-32">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ecd38f]">
            Dental Time
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold">
            Nieuwe patiënt worden?
          </h2>
          <p className="mt-4 leading-7 text-blue-50">
            Schrijf uzelf of uw gezin online in. Ons team neemt binnen twee
            werkdagen contact met u op.
          </p>
          <Link
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#24366f] transition hover:bg-[#fff8e7]"
            href="/nieuwe-patienten-inschrijven"
          >
            Online inschrijven
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <a
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold transition hover:bg-white/10"
            href="tel:0306049005"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            030 604 9005
          </a>
          <p className="mt-6 flex gap-2 border-t border-white/15 pt-5 text-sm leading-6 text-blue-100">
            <MapPin
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 flex-none text-[#ecd38f]"
            />
            Waardijnburg 3, 3437 AR Nieuwegein
          </p>
        </aside>
      </div>

      <section
        aria-labelledby="faq-heading"
        className="border-y border-[#ded8cc] py-12 sm:py-16"
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a752b]">
          Veelgestelde vragen
        </p>
        <h2
          className="mt-3 font-serif text-3xl font-semibold sm:text-4xl"
          id="faq-heading"
        >
          Vragen over {treatment.name.toLowerCase()}
        </h2>
        <div className="mt-7 divide-y divide-slate-200">
          {treatment.faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="cursor-pointer list-none pr-8 text-lg font-semibold marker:content-none">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="float-right text-[#9a752b] transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading" className="pt-12 sm:pt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a752b]">
              Verder lezen
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-semibold"
              id="related-heading"
            >
              Gerelateerde behandelingen
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 font-semibold text-[#314784]"
            href="/behandelingen"
          >
            Alle behandelingen
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {relatedTreatments.map((related) => (
            <Link
              key={related.slug}
              className="group rounded-3xl border border-[#ded8cc] bg-white p-7 transition hover:border-[#b18a36]/50 hover:shadow-[0_14px_35px_rgba(17,24,43,0.07)]"
              href={`/behandelingen/${related.slug}`}
            >
              <h3 className="font-serif text-2xl font-semibold">
                {related.name}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {related.shortDescription}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[#314784] transition group-hover:gap-3">
                Lees meer
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
        <Link
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#314784]"
          href="/behandelingen"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Terug naar alle behandelingen
        </Link>
      </section>
    </article>
  );
}
