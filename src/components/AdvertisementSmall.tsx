import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";

interface AdvertisementSmallProps {
  advertisementButton: {
    url: string;
    shouldOpenANewTab: boolean;
    buttonText: string;
    descriptionButton: string;
    organizationLogo?: {
      src: string;
      alt: string;
    };
    secondaryButtonText?: string;
    secondDescription?: string;  
    secondaryUrl?: string;       
    secondaryOrganisationLogo?: {
      src: string;
      alt: string;
    };
    parameter: string;
  };
  pageParameter: string;
}


const AdvertisementSmall: React.FC<AdvertisementSmallProps> = ({ advertisementButton, pageParameter }) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!advertisementButton || !isVisible) return null;

  const params = searchParams.toString();
  const shouldShowSecondaryData = params === pageParameter || pathname.endsWith(pageParameter);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleLinkClick = () => {
    const parameter = advertisementButton.parameter || "";
    return shouldShowSecondaryData ? advertisementButton.secondaryUrl + parameter : advertisementButton.url + parameter;
  };

  return (
    <div className="rounded-t-lg p-5">
     <h3 className="text-gray-600 uppercase text-sm font-semibold mb-3 tracking-wide">Sponsored</h3>
      <div className="h-auto p-14 px-10 relative flex flex-col gap-3 text-center justify-center items-center border-2 rounded-lg border-gray-200">
        <p onClick={handleClose} className="absolute top-1.5 cursor-pointer right-3 text-gray-400 hover:text-red-500 focus:outline-none text-sm">
          &#x2715;
        </p>
        <Link
          href={handleLinkClick()}
          target={advertisementButton.shouldOpenANewTab ? "_blank" : "_self"}
          rel={advertisementButton.shouldOpenANewTab ? "noopener noreferrer" : ""}
          className="bg-green-600 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl shadow-2xl text-lg transition-all duration-500 transform hover:scale-105"
        >
          {shouldShowSecondaryData ? advertisementButton.secondaryButtonText : advertisementButton.buttonText}
        </Link>
        <p className="text-xs max-w-[198px] font-medium mt-2">
          {shouldShowSecondaryData ? advertisementButton.secondDescription : advertisementButton.descriptionButton}
        </p>
        {(shouldShowSecondaryData && advertisementButton.secondaryOrganisationLogo) ? (
          <div className="mt-4 absolute bottom-2 right-2">
            <Image
              src={advertisementButton.secondaryOrganisationLogo.src}
              alt={advertisementButton.secondaryOrganisationLogo.alt}
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-300 shadow-lg"
              loading="lazy"
            />
          </div>
        ) : (
          advertisementButton.organizationLogo && (
            <div className="mt-4 absolute bottom-2 right-2">
              <Image
                src={advertisementButton.organizationLogo.src}
                alt={advertisementButton.organizationLogo.alt}
                width={96}
                height={96}
                className="rounded-full m-0"
                loading="lazy"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdvertisementSmall;
