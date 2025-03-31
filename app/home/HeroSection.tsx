"use client";
import { title, subtitle } from "@/components/primitives";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { TextEffect } from '@/components/motion-primitives/text-effect';
import { Phone } from "lucide-react";



export default function HeroSection() {
    return (
        <div>
            <section className="flex flex-col justify-center w-screen h-screen gap-6 py-8 md:py-10 bg-[url('/sitting-smile.jpg')] bg-cover bg-center">
                
                {/* Content Wrapper */}
                <div className=" items-center md:ml-40 md:items-left p-20 bg-zinc-100 bg-opacity-70 w-fit rounded-md">

                    <div className="inline-block max-w-3xl text-left">
                        <div className="flex items-center uppercase ">

                            <TextEffect 
                                per="word" 
                                as="h1" 
                                preset="fade-in-blur"
                                speedSegment={0.6} 
                                className={title({ 
                                    class: "font-[NotoSerif] font-normal tracking-wider text-black text-4xl md:text-7xl" 
                                })} 
                            >
                                It's Dental Time.
                            </TextEffect>

                            <img 
                                src="/IconBlack.svg" 
                                className="ml-6 w-16 relative animate-blur-in" 
                            />
                        </div>

                        <TextEffect
                            per="word"
                            preset="fade-in-blur"
                            speedSegment={0.6}
                            delay={0.3}
                            className={subtitle({
                                class: "mt-4 text-lg md:text-xl text-black" 
                            })}
                        >
                            Bel ons gerust om een afspraak te maken
                        </TextEffect>
                    </div>

                    
                    <div className="flex gap-4 mt-6 animate-slide-in-left animate-blur-in">
                        <Button
                            as={Link}
                            href="tel:0306049005"
                            color="primary"
                            variant="shadow"
                            className="rounded-md uppercase animate-blur-in"
                        >
                        <Phone size={20} className="mr-2" />
                            030 6049005
                        </Button>
                    </div>


                    <TextEffect
                        per="char"
                        preset="fade-in-blur"
                        speedSegment={0.6}
                        delay={0.5}
                        className="pt-6 text-left text-lg text-black"
                    >
                        Uw glimlach, onze zorg.
                    </TextEffect>
                </div>

            </section>


            {/* Custom Animations */}
            <style jsx>{`
                @keyframes blur-in {
                    0% {
                        filter: blur(10px);
                        opacity: 0;
                    }
                    100% {
                        filter: blur(0);
                        opacity: 1;
                    }
                }
                .animate-blur-in {
                    animation: blur-in 1.8s ease-in-out forwards;
                }

                @keyframes slide-in-left {
                    0% {
                        transform: translateX(-50px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-left {
                    animation: slide-in-left 0.8s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}
