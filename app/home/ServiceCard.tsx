"use client";

import { Card, CardBody } from "@heroui/react";
import NextLink from "next/link";

interface ServiceCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Adjusted type
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  Icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <NextLink
      className="block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      href={href}
    >
      <Card
        fullWidth
        className="h-full border-none bg-opacity-0 shadow-none transition-transform duration-200 hover:-translate-y-1"
      >
        <CardBody className="p-6">
          <div className="mb-6 flex h-16 w-16 items-center justify-center">
            <Icon />
          </div>

          <h3 className="mb-3 text-xl font-semibold text-navy-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <span className="mt-5 text-sm font-semibold text-primary-700">
            Lees meer <span aria-hidden="true">→</span>
          </span>
        </CardBody>
      </Card>
    </NextLink>
  );
}
