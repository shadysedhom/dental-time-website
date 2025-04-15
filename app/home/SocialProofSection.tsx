import Image from "next/image";
import { Link } from "@heroui/link";
import { Star } from "lucide-react";
import ReviewSlider from "./ReviewSlider";

export default function SocialProofSection() {
  const socialProofData = [
    {
      value: "1K+",
      label: "Tevreden patiënten",
    },
    {
      value: "20+",
      label: "Jaar ervaring",
    },
    {
      value: "9.4",
      label: "Tandarts.nl Rating",
    },
  ];

  return (
    <section className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-8 py-12 px-4 md:max-w-screen-sm mx-auto sm:gap-16 sm:px-8">

      {/* Review Slider */}
      <ReviewSlider />

      {/* Google Rating */}
      <div className="flex items-center">
        <div className="flex flex-col items-center mb-2">
          <Image
          alt="Google Icon"
          className="w-14 h-14 mr-4 sm:mr-10 rounded-full"
          height={100}
          src="/google-icon.svg"
          width={100}
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-gray-800 font-bold text-lg text-center sm:text-left">Google Rating</h3>

          <div className="flex flex-row justify-center sm:justify-start">
          <h2 className="text-xl font-bold text-orange-400 mr-2">4.2</h2>

          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
              i < 4 ? "text-orange-400 fill-orange-400" : "text-gray-300"
              }`}
            />
            ))}
          </div>
          </div>

          <Link
          className="text-blue-500 mt-2 text-sm text-center sm:text-left"
          href="https://g.co/kgs/XuoK1aZ"
          >
          Zie alle reviews
          </Link>
        </div>
      </div>

      {/* Social Proof Numbers */}
      {socialProofData.map((item, index) => (
      <div key={index} className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-black">{item.value}</h2>
        <p className="text-gray-500">{item.label}</p>
      </div>
      ))}
    </section>
  );
}
