import NextLink from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  Icon: LucideIcon;
  description: string;
  href: string;
  title: string;
}

export default function ServiceCard({
  Icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <NextLink
      className="group block h-full rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88e32] focus-visible:ring-offset-4"
      href={href}
    >
      <article className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-[1.5rem] border border-[#b88e32]/15 bg-[#fffdf9] p-7 shadow-[0_12px_40px_rgba(17,24,43,0.045)] transition duration-300 group-hover:-translate-y-1 group-hover:border-[#b88e32]/35 group-hover:shadow-[0_18px_45px_rgba(17,24,43,0.08)] motion-reduce:transform-none sm:p-8">
        <span className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-[#b88e32] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transform-none" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6edd8] text-[#8d6a25]">
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
        </div>

        <h3 className="mt-7 break-words font-serif text-2xl font-semibold leading-tight text-[#11182b] [hyphens:auto]">
          {title}
        </h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{description}</p>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-bold text-[#80601f]">
          Lees meer
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
          />
        </span>
      </article>
    </NextLink>
  );
}
