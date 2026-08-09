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
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import CustomLink from "@/components/CustomLink";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === "/nieuwe-patienten-inschrijven") return null;

  return (
    <HeroUINavbar
      className="!fixed inset-x-0 top-3 z-50 mx-auto w-[calc(100%-1.5rem)] rounded-2xl border border-white/80 !bg-[#fbfaf7] !bg-opacity-90 px-3 py-1 shadow-[0_12px_40px_rgba(17,24,43,0.14)] backdrop-blur-2xl sm:px-5 md:w-5/6 md:max-w-6xl"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="static"
      shouldBlockScroll={false}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent
        className="basis-2/5 justify-center sm:basis-full"
        justify="center"
      >
        <NavbarBrand as="div" className="gap-3">
          <NextLink
            className="flex h-14 items-center justify-start px-1 md:h-16"
            href="/"
          >
            <Image
              priority
              alt="Dental Time Logo (Navbar)"
              className="h-12 w-auto drop-shadow-[0_1px_1px_rgba(17,24,43,0.14)] md:h-16"
              height={78}
              src="/dental-time-gold.svg"
              width={148}
            />
          </NextLink>
        </NavbarBrand>

        <ul className="mx-auto hidden grow justify-center gap-10 lg:flex xl:gap-14">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <CustomLink
                navbar
                className={`text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${
                  pathname === item.href
                    ? "!text-[#8d6a25]"
                    : "!text-[#11182b] hover:!text-[#8d6a25]"
                }`}
                href={item.href}
              >
                {item.label}
              </CustomLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      />

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <NavbarMenuToggle className="h-11 w-11" />
      </NavbarContent>

      <NavbarMenu className="mt-4 rounded-t-[1.5rem] bg-[#fbfaf7]/98 px-4 pt-6 shadow-2xl backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-md flex-col gap-3">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Button
                as={NextLink}
                className={`w-full rounded-xl py-4 text-left text-base font-semibold ${
                  index === siteConfig.navMenuItems.length - 1
                    ? "border border-[#b88e32] bg-[#d7b45a] text-[#11182b] shadow-[0_10px_25px_rgba(177,138,54,0.2)]"
                    : "text-[#11182b] hover:bg-[#f3ead8]"
                }`}
                href={item.href}
                size="lg"
                variant={
                  index === siteConfig.navMenuItems.length - 1
                    ? "solid"
                    : "ghost"
                }
                onPress={() => setIsMenuOpen(false)}
              >
                {index === siteConfig.navMenuItems.length - 1 ? (
                  <UserPlus />
                ) : null}

                {item.label}
              </Button>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
