import { Link } from '@heroui/link';
import { Star } from 'lucide-react';

export default function SocialProofSection() {

    const socialProofData = [
        {
            value: "1K+",
            label: "Tevreden patiënten"
        },
        {
            value: "20+",
            label: "Jaar ervaring"
        },
        {
            value: "9.4",
            label: "Tandarts.nl Rating"
        },
    ]

    return (
        <section className="flex flex-wrap justify-center items-center gap-16 py-12">

            {/* Google Rating */}
            <div className="flex items-center">

                <div className="flex flex-col items-center mb-2">
                    <img
                        src="/google-icon.svg"
                        alt="Google"
                        className="w-14 h-14 mr-10 rounded-full"
                    />
                </div>

                <div className='flex flex-col'>
                    <h3 className="text-gray-800 font-bold text-lg">
                        Google Rating
                    </h3>

                    <div className='flex flex-row'>
                        <h2 className="text-xl font-bold  text-orange-400 mr-2">
                            4.2
                        </h2>

                        <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                key={i}
                                className={`w-5 h-5 ${
                                    i < 4 ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
                                }`}
                                />
                            ))}
                        </div>
                    </div>

                    <Link href="https://g.co/kgs/XuoK1aZ" className="text-blue-500 mt-2 text-sm">
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