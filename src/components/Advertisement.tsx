import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

interface AdvertisementProps {
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
  onClose: () => void;
}

const Advertisement: React.FC<AdvertisementProps> = ({ advertisementButton, onClose, pageParameter }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!advertisementButton) return null;

  const params = searchParams.toString();
  const isSecondary = params === pageParameter || pathname.endsWith(pageParameter);

  const handleLinkClick = () => {
    const parameter = advertisementButton.parameter || "";
    return isSecondary ? advertisementButton.secondaryUrl + parameter : advertisementButton.url + parameter;
  };

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md relative">
      <h3 className="text-gray-600 uppercase text-sm font-semibold mb-3 tracking-wide">Sponsored</h3>
      <div className="relative flex flex-col items-center justify-center text-center border border-gray-300 rounded-lg p-4 bg--500 transition duration-500 hover:shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-1.5 right-3 text-gray-400 hover:text-red-500 focus:outline-none text-xl"
        >
          &times;
        </button>

        <Link
          href={handleLinkClick()}
          target={advertisementButton.shouldOpenANewTab ? "_blank" : "_self"}
          rel={advertisementButton.shouldOpenANewTab ? "noopener noreferrer" : ""}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-5 mt-10 px-16 rounded-xl shadow-2xl text-lg transition-all duration-500 transform hover:scale-105"
        >
          {isSecondary ? advertisementButton.secondaryButtonText : advertisementButton.buttonText}
        </Link>

        <p className="text-md text--100 mb-10 mt-4 max-w-md mx-auto">
          {isSecondary ? advertisementButton.secondDescription : advertisementButton.descriptionButton}
        </p>

        <div className="mt-6 absolute bottom-2 w-24 h-24">
          {isSecondary && advertisementButton.secondaryOrganisationLogo ? (
            <Image
              src={advertisementButton.secondaryOrganisationLogo.src}
              alt={advertisementButton.secondaryOrganisationLogo.alt}
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-300 shadow-lg"
              loading="lazy"
            />
          ) : (
            advertisementButton.organizationLogo && (
              <div className="absolute bottom-2 right-2">
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
    </div>
  );
};

export default Advertisement;
