"use client";
import { Button } from "@heroui/button";
import NextLink from "next/link";


interface AboutSectionProps {
  imagePosition: "left" | "right";
  title: string;
  descriptionOne: string;
  descriptionTwo?: string;
  imageSrc: string;
}

export default function AboutSection({
  imagePosition,
  title,
  descriptionOne,
  descriptionTwo,
  imageSrc,
}: AboutSectionProps) {
  // Determine the order of content based on image position
  const contentOrder = imagePosition === "left" ? "lg:order-2" : "lg:order-1";
  const imageOrder = imagePosition === "left" ? "lg:order-1" : "lg:order-2";

  const paragraphStyling = " text-left max-w-[700px] text-gray-800 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed";

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container mx-auto text-left px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">

          {/* Text section */}
          <div className={`space-y-4 ${contentOrder} p-4 md:p-0`}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {title}
                </h2>

                <p className={paragraphStyling}>
                  {descriptionOne}
                </p>

                {descriptionTwo && (
                  <p className={paragraphStyling}>
                      {descriptionTwo }
                  </p>
                )}

                {/* For the second section, add a CTA button */}
                {imagePosition === "left" && (
                    <NextLink href="tel:0306049005">
                        <Button
                            className="p-4 mt-10 text-white uppercase rounded-md"
                            variant="solid"
                            color="primary"
                        >
                            Bel Voor Afspraak
                        </Button>
                    </NextLink>
                )}

          </div>

          {/* Image section */}
          <div className={`mx-auto aspect-video ${imageOrder}`}>
            <img
              alt="About section image"
              className="rounded-xl object-cover"
              src={imageSrc}
              style={{
                aspectRatio: "16/9",
                objectFit: "cover",
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}