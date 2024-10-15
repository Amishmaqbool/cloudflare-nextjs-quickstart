"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Logo from "../assets/images/logo.png";

const Footer = () => {
  const pathname = usePathname();

  const pagesWithReducedMaxWidth = ["/privacy-policy", "/about-us", "/terms-of-Service"];

  const isReducedWidth = pagesWithReducedMaxWidth.includes(pathname);

  const containerMaxWidth = isReducedWidth ? "max-w-[1000px]" : "max-w-screen-2xl  px-5";

  return (
    <div className="bg-[#f8f8f8] border-t">
      <div
        className={`${containerMaxWidth} mx-auto flex gap-4 text-[14px] text-gray-600 flex-col justify-between items-start w-full px-5 py-5`}
      >
        <div>
          <h1 className="text-5xl font-signature">
            <Link href="/">
              <Image loading="lazy" src={Logo} alt="logo" className="w-48" />
            </Link>
          </h1>
        </div>
        <p>&copy; 111 Apps. All rights reserved.</p>
        <div className="flex gap-2">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/about-us" className="hover:underline">
            About US
          </Link>
          <Link href="/" className="hover:underline">
            DMCA
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
