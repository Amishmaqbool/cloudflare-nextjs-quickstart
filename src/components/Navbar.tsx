"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SearchInput from "./SearchInput";
import Search from "../assets/svgs/search.svg";

interface Logo {
  appLogo: {
    src: string;
    alt: string;
  };
}

interface NavbarProps {
  logo: Logo;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const pathname = usePathname();

  const pagesWithReducedMaxWidth = ["/privacy-policy", "/about-us", "/terms-of-Service"];

  const isReducedWidth = pagesWithReducedMaxWidth.includes(pathname);

  const containerMaxWidth = isReducedWidth ? "max-w-[1000px] px-[1rem]" : "max-w-screen-2xl  px-5";

  const handleSearchToggle = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div className="bg-[#f7f7f7] w-full border-b">
      <div className={`flex justify-between items-center ${containerMaxWidth} mx-auto h-16`}>
        <div>
          <h1 className="text-5xl font-signature ml-2">
            <Link href="/">
              <Image
                loading="lazy"
                src={logo.appLogo.src}
                alt={logo.appLogo.alt}
                className="w-32"
                width={50}
                height={50}
              />
            </Link>
          </h1>
        </div>

        {!isSearchVisible && (
          <div className="block md:hidden">
            <Image
              loading="lazy"
              src={Search}
              alt="search"
              className="w-5 cursor-pointer"
              onClick={handleSearchToggle}
            />
          </div>
        )}

        {isSearchVisible && <SearchInput isMobile={true} onToggle={handleSearchToggle} />}

        <SearchInput isMobile={false} />
      </div>
    </div>
  );
};

export default Navbar;
