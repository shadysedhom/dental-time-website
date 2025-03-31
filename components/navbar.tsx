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

import { siteConfig } from "@/config/site";
import CustomLink from "@/components/CustomLink";

import { UserPlus } from "lucide-react";

export const Navbar = () => {

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className=" fixed top-0 z-20 py-2 px-6 bg-zinc-100 bg-opacity-60 mx-auto rounded-md md:mt-3 md:w-5/6 ">


      {/* ------------------          Desktop Navbar       ---------------------- */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">

            {/* Logo */}
            <NavbarBrand as="li" className="gap-3 max-w-fit">
              <NextLink className="flex justify-start items-center gap-1" href="/">

                <img 
                  src="/dental-time-black.svg"
                  alt="Dental Time Logo"
                  className="h-full max-h-16 md:h-16 w-auto" // h-full for mobile, h-16 for tablet and larger
                />
                
              </NextLink>
            </NavbarBrand>

            {/* Navbar Menu */}
            <ul className="hidden lg:flex gap-16 justify-center mx-auto">
              {siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>

                  <CustomLink href={item.href} className=" text-lg uppercase ">
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
              href="/inschrijven"
              variant="solid"
              color="primary"
            >
              <UserPlus className="" />
              Inschrijven
            </Button>
        </NavbarItem>

      </NavbarContent>


      { /* ---------------------       Mobile Navbar          ---------------------- */}
      
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="mt-4 rounded-t-lg bg-gradient-to-br from-zinc-300 via-gray-100 to-zinc-400 shadow-lg">
        <div className="mx-4 mt-2 flex flex-col gap-4">

          {siteConfig.navMenuItems.map((item, index) => (
        
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink href={item.href}>
                <Button
                  variant={
                      index === siteConfig.navMenuItems.length - 1
                    ? "solid"
                    : "ghost"
                  }
                  color={
                      index === siteConfig.navMenuItems.length - 1
                    ? "primary"
                    : "default"
                  }
                  className={`w-full text-left rounded-lg py-4 text-lg ${
                      index === siteConfig.navMenuItems.length - 1
                    ? "shadow-md"
                    : "hover:bg-gray-300"
                  }`}
                  href={item.href}
                  size="lg"
                >
                  
                  {
                    index === siteConfig.navMenuItems.length -  1 ?
                    <UserPlus />
                    : null
                  }

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
