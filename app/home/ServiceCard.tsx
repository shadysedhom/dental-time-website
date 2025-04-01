"use client";

import { Card, CardBody } from "@heroui/card";

interface ServiceCardProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Adjusted type
  title: string;
  description: string;
}

export default function ServiceCard({
  Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <Card fullWidth className="border-none shadow-none bg-opacity-0">
      <CardBody className="p-6">
        <div className=" w-16 h-16 flex items-center justify-center mb-6">
          <Icon />
        </div>

        <h3 className="text-xl font-semibold text-navy-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardBody>
    </Card>
  );
}
