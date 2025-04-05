import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import { Star } from "lucide-react";


export default function ReviewSlider() {
    const reviews = [
      {
        value: "5.0",
        label: `Ik en mijn partner zijn hier beide ingeschreven. Wij zijn super 
        blij met de kundigheid van de tandarts. Ze houd rekening met je, legt de 
        mogelijkheden goed uit en is erg aardig.`,
        reviewer: "Salomé",
      },
      {
        value: "5.0",
        label: `Kom hier al een decennia tevreden langs. De behandeling is 
        professioneel, effectief, communicatief en efficiënt.`,
        reviewer: "Wouter",
      },
      {
        value: "4.0",
        label: `Kundig er zeer vriendelijk!! Wel zo pretig als je komt 
        voor een gaatje vullen. Is namelijk niet mijn favoriete bezigheid.`,
        reviewer: "N S",
      },
      {
        value: "5.0",
        label: `Zeer vriendelijke, zorgzame, professionele arts. Werkt met de nieuwste technieken.`,
        reviewer: "Frans W.",
      },
    ];
  
    return (
      <section className="flex flex-col items-center">

        {/* Header - commented out */}
        {/* <h2 className="text-4xl font-bold text-black mb-6">Tevreden Patiënten</h2> */}

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation={false}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="w-full max-w-md md:max-w-xl border rounded-lg shadow-md"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} >
              <div className="flex flex-col items-center text-center p-6 pb-10">
  
                {/* Loop to draw stars based on review value */}
                <div className="flex mt-1">
                  {[...Array(Math.round(Number(review.value)))].map((_, i) => (
                    <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(Number(review.value)) ? "text-orange-400 fill-orange-400" : "text-gray-300"
                    }`}
                    />
                  ))}
                </div>
  
                {/* Review Text */}
                <p className="text-gray-500 mt-4">{review.label}</p>

                {/* Reviewer Name - commented out for privacy */}
                {/* <p className="text-gray-400 mt-4">- {review.reviewer}</p> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }