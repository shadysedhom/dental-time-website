"use client";
import Image from "next/image";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { UserPlus } from "lucide-react";

import { siteConfig } from "@/config/site";
import CustomLink from "@/components/CustomLink";

export const Navbar = () => {
  return (
    <HeroUINavbar
      className=" fixed top-0 z-20 py-2 px-6 bg-zinc-100 bg-opacity-60 mx-auto md:rounded-md md:mt-3 md:w-5/6 "
      maxWidth="xl"
      position="sticky"
    >

      <style jsx>{`
        @keyframes gradientShine {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        :global(.shining-gradient) {
          background: repeating-linear-gradient(
            240deg,
            #fff,  /* Almost white */
            #d8d8d8, /* Light gray */
            #b8d5e0 /* Light blue */
          );
          background-size: 200% 200%;
          animation: gradientShine 8s ease-in-out infinite;
        }
      `}</style>

      {/* ------------------          Desktop Navbar       ---------------------- */}
      <NavbarContent className="basis-2/5 sm:basis-full justify-center" justify="center">
        {/* Logo */}
        <NavbarBrand as="div" className="gap-3">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              priority
              alt="Dental Time Logo (Navbar)"
              className=" h-full md:h-16 w-auto" // h-full for mobile, h-16 for tablet and larger
              height={100}
              src="/dental-time-black.svg"
              width={100}
            />
          </NextLink>
        </NavbarBrand>

        {/* Navbar Menu */}
        <ul className="hidden grow lg:flex gap-16 justify-center mx-auto">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <CustomLink className=" text-lg uppercase " href={item.href}>
                {item.label}
              </CustomLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* Signup Button */}
        <NavbarItem className="hidden md:flex">
          <Button
            as={Link}
            className="text-sm font-normal text-white rounded-md uppercase "
            color="primary"
            href="/inschrijven"
            variant="solid"
          >
            <UserPlus className="" />
            Inschrijven
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* ---------------------       Mobile Navbar          ---------------------- */}

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="mt-4 rounded-t-lg shining-gradient shadow-lg">
        <div className="mx-4 mt-2 flex flex-col gap-4">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href={item.href}>
                <Button
                  className={`w-full text-left rounded-lg py-4 text-lg ${
                    index === siteConfig.navMenuItems.length - 1
                      ? "shadow-md"
                      : "hover:bg-gray-300"
                  }`}
                  color={
                    index === siteConfig.navMenuItems.length - 1
                      ? "primary"
                      : "default"
                  }
                  href={item.href}
                  size="lg"
                  variant={
                    index === siteConfig.navMenuItems.length - 1
                      ? "solid"
                      : "ghost"
                  }
                >
                  {index === siteConfig.navMenuItems.length - 1 ? (
                    <UserPlus />
                  ) : null}

                  {item.label}
                </Button>
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
