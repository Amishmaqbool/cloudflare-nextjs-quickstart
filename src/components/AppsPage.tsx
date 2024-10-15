"use client";

import Image from "next/image";
import Link from "next/link";
import Ratings from "@/components/Ratings";
import { AppProps } from "@/lib/type";
import { useState } from "react";
import Advertisement from "./Advertisement";
import ForwardArrow from "@/assets/svgs/forward.svg";
import BackArrow from "@/assets/svgs/back.svg";
import { marked } from "marked";
import HalfFill from "@/assets/svgs/halfstar.svg";
import FullFill from "@/assets/svgs/fullstar.svg";
import EmptyFill from "@/assets/svgs/star.svg";
import GooglePlayIcon from "@/assets/svgs/googlePlayIcon.svg";
import AppleIcon from "@/assets/svgs/appleIcon.svg";
import AdvertisementSmall from "./AdvertisementSmall";
import AppsByTag from "@/components/AppsByTag";
import Modal from "@/components/Modal";

const FullStar = () => (
  <Image
    loading="lazy"
    className="m-0"
    src={FullFill}
    alt="star"
    width={14}
    height={14}
  />
);
const HalfStar = () => (
  <Image
    loading="lazy"
    className="m-0"
    src={HalfFill}
    alt="star"
    width={14}
    height={14}
  />
);
const EmptyStar = () => (
  <Image
    loading="lazy"
    className="m-0"
    src={EmptyFill}
    alt="star"
    width={14}
    height={14}
  />
);
interface AppsPageProps {
  appsPage: {
    title: string;
    app: AppProps;
    topDownloads: {
      title: string;
      relatedApps: AppProps[];
      columns: number | undefined;
    };
    parameter: string;
  };
}

const AppsPage: React.FC<AppsPageProps> = ({ appsPage }) => {
  const { app } = appsPage;
  const [isAdvertisementSmallVisible, setIsAdvertisementSmallVisible] =
    useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");
  const handleAdvertisementClose = () => {
    setIsAdvertisementSmallVisible(false);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 5;
  const totalSlides = app?.appScreenshots?.length || 0;

  if (!app) {
    return <div>App not found</div>;
  }

  const handleNext = () => {
    if (currentIndex < totalSlides - visibleSlides) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const bodyCopyHtml = marked(app.bodyCopy || "");

  const getStarComponents = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return [
      ...Array(fullStars).fill(<FullStar />),
      ...Array(halfStar).fill(<HalfStar />),
      ...Array(emptyStars).fill(<EmptyStar />),
    ];
  };

  const handleImageClick = (src: string, alt: string) => {
    setModalImageSrc(src);
    setModalImageAlt(alt);
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-hidden">
      <div className="bg- p-4 md:p-6 rounded-lg">
        <div className="flex items-center text-sm mb-4 md:mb-6">
          <Link
            href="/"
            className="hover:underline font-semibold text-gray-600"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="font-medium text-gray-700">{app.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-8">
          <div className="flex items-center mb-6 lg:mb-0 max-lg:w-full">
            <div className="w-20 h-20 sm:w-36 sm:h-36 flex-shrink-0">
              <Image
                src={app.appLogo.src}
                width={200}
                height={200}
                alt={app.appLogo.alt}
                className="w-full h-full rounded-2xl object-cover border border-gray-300"
                loading="lazy"
              />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-semibold sm:text-3xl">
                {app.title}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {getStarComponents(app.ratings.totalRatings).map(
                    (star, index) => (
                      <span key={index}>{star}</span>
                    )
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {app.ratings.totalRatings.toFixed(1)} / 5
                </div>
              </div>
            </div>
          </div>

          <div className="lg:block max-lg:w-full">
            {app.advertisementButton && isAdvertisementSmallVisible && (
              <AdvertisementSmall
                advertisementButton={app.advertisementButton}
                pageParameter={appsPage.parameter}
              />
            )}
          </div>
        </div>

        <div className="flex max-lg:flex-wrap justify-between items-start lg:max-w-[70%]">
          <div className="grid grid-cols-2 max-w-lg sm:grid-cols-3 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Downloads</p>
              <p className="text-gray-600">{app.downloads}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Developer</p>
              <p className="text-gray-600">{app.developer}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Category</p>
              {app.category.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="text-gray-600 hover:underline block"
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Android OS</p>
              <p className="text-gray-600">{app.androidOs}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Version</p>
              <p className="text-gray-600">{app.version}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Price</p>
              <p className="text-gray-600">{app.price}</p>
            </div>
          </div>

          <div className="max-md:flex-col max-md:mx-auto gap-2 max-md:my-10">
            <Link
              href={`${app.googleAppStoreButton?.url}`}
              target="_blank"
              className="flex max-md:max-h-auto gap-2 items-center p-4 rounded-lg hover:bg-opacity-90 bg-black cursor-pointer"
            >
              <div>
                <Image
                  src={GooglePlayIcon}
                  alt="Google Play Icon"
                  width={22}
                  height={22}
                  loading="lazy"
                />
              </div>
              <p className="m-0 text-lg font-medium text-white">Google Play</p>
            </Link>
            <Link
              href={`${app.appleStoreButton?.url}`}
              target="_blank"
              className="flex max-md:max-h-auto max-md:mt-5 gap-2 items-center md:mt-5 p-4 rounded-lg hover:bg-opacity-90 bg-black cursor-pointer"
            >
              <div>
                <Image
                  src={AppleIcon}
                  alt="Google Play Icon"
                  width={22}
                  height={22}
                  loading="lazy"
                  className="min-h-[22px] min-w-[22px]"
                />
              </div>
              <p className="m-0 text-lg font-medium text-white">Apple Store</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="lg:w-[70%] w-full">
          {app.advertisementButton && (
            <Advertisement
              onClose={handleAdvertisementClose}
              advertisementButton={app.advertisementButton}
              pageParameter={appsPage.parameter}
            />
          )}

          <div className="bg-white pt-5 sm:pt-10 text-[17px] font-normal block max-w-none text-[#666666]">
            <h2 className="text-black p-5 font-medium text-xl w-full">
              About this app
            </h2>
            <div
              className="prose prose-strong:font-semibold prose-strong:text-[#5F6368] prose-p:text-[#66666] leading-7 bg-white px-5 max-md:text-sm md:text-[17px] font-normal block max-w-none text-[#5F6368]"
              dangerouslySetInnerHTML={{ __html: bodyCopyHtml }}
            />
            <div className="p-5 mt-5">
              <Ratings
                totalRatings={app.ratings?.totalRatings}
                oneStarRatings={app.ratings?.oneStarRatings}
                twoStarRatings={app.ratings?.twoStarRatings}
                threeStarRatings={app.ratings?.threeStarRatings}
                fourStarRatings={app.ratings?.fourStarRatings}
                fiveStarRatings={app.ratings?.fiveStarRatings}
                showTotalOnly={false}
                getStarComponents={getStarComponents}
              />
            </div>

            <div className="relative w-full mt-10 p-5 pt-0">
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 z-10 -translate-y-1/2"
              >
                <Image
                  src={ForwardArrow}
                  width={50}
                  height={50}
                  alt="Foward arrow"
                  className="rotate-180"
                  loading="lazy"
                />
              </button>

              <div className="overflow-hidden">
                <h1 className="text-4xl pb-6 pl-1 font-semibold text-black">
                  Screenshots:
                </h1>
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (currentIndex / totalSlides) * 100
                    }%)`,
                    width: `${(totalSlides / visibleSlides) * 100}%`,
                  }}
                >
                  {app.appScreenshots?.map((screenshot, index) => (
                    <div
                      key={index}
                      style={{ flex: `0 0 ${100 / visibleSlides}%` }}
                      className="px-2"
                    >
                      <Image
                        src={screenshot?.src || ""}
                        alt={screenshot?.alt || `Screenshot ${index + 1}`}
                        width={92}
                        height={296}
                        loading="lazy"
                        className="aspect-[16/16] lg:h-[296px] max-lg:h-[100px] w-full rounded-md shadow-md object-fill cursor-pointer"
                        onClick={() =>
                          handleImageClick(screenshot.src, screenshot.alt)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
              >
                <Image
                  src={BackArrow}
                  width={50}
                  height={50}
                  alt="Foward arrow"
                  loading="lazy"
                />
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              imageSrc={modalImageSrc}
              imageAlt={modalImageAlt}
            />
          </div>
        </div>
        <div className="max-lg:hidden -mt-8">
          <AppsByTag
            title={appsPage.topDownloads.title}
            relatedApps={appsPage.topDownloads.relatedApps}
            columns={appsPage.topDownloads.columns}
          />
        </div>
      </div>
    </div>
  );
};

export default AppsPage;
