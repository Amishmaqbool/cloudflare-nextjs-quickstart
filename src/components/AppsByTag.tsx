"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Star from "@/assets/svgs/star.svg";
import { AppProps } from "@/lib/type";
import ForwardArrow from "@/assets/svgs/forward.svg";
import BackArrow from "@/assets/svgs/back.svg";

interface AppsByTagProps {
  relatedApps: AppProps[];
  title: string;
  columns?: number;
  showCarousel?: boolean;
  showBackgroundImage?: boolean;
}

const AppsByTag: React.FC<AppsByTagProps> = ({
  relatedApps,
  title,
  columns = 1,
  showBackgroundImage,
  showCarousel = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 5;
  const totalSlides = relatedApps.length;

  if (relatedApps?.length === 0) {
    return <p>No apps found for the tag: {title}</p>;
  }

  const gridColumnsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[columns] || "grid-cols-1";

  const logoSize = columns > 5 ? 140 : 50;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalSlides - visibleSlides ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalSlides - visibleSlides : prevIndex - 1
    );
  };

  return (
    <div className={`${showBackgroundImage ? "lg:pr-0" : "mt-8"}`}>
      <h2 className="text-[20px] font-semibold mb-2 max-lg:pl-5">{title}</h2>

      {showBackgroundImage && (
        <div
          className={`overflow-auto scrollbar-hide-carousel grid gap-4 grid-flow-col auto-cols-max -mx-4 px-4 lg:px-0 lg:mx-0 lg:grid-cols-3 lg:grid-flow-row max-lg:mr-4 lg:pr-8`}
        >
          {relatedApps?.map((app, index) => (
            <div
              key={index}
              className="w-72 max-lg:first:ml-5 sm:w-80 overflow-hidden rounded-3xl lg:w-full l py-2 max-lg:h-48 lg:h-[185px] relative mb-2.5"
            >
              {app.backgroundImage && (
                <Image
                  className="absolute object-fit rounded-3xl"
                  src={app.backgroundImage}
                  alt={app.title}
                  width={800}
                  height={600}
                  quality={15}
                  sizes="(max-width: 600px) 400px, 800px" 
                  loading="eager"
                  priority
                />
              )}
              <Link
                className="flex absolute -bottom-2 pr-5 rounded-b-3xl items-center justify-between gap-2 link py-[0.75rem] backdrop-blur px-[1rem] bg-[#0000004d] w-full"
                href={`/apps/${app.slug}`}
              >
                <div className="flex gap-2 items-center">
                  {app.appLogo?.src && (
                    <Image
                    
                      src={app.appLogo.src}
                      width={50}
                      height={50}
                      alt={app.appLogo.alt || "App logo"}
                      className="w-10 rounded-xl overflow-hidden"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <h3 className="text-sm text-white font-medium">
                      {app.title}
                    </h3>
                  </div>
                </div>
                <button className="py-1 rounded-lg px-4 font-semibold uppercase bg-white text-black hover:bg-gray-200 transition duration-500">
                  Get
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}

      <div
        className={`${
          showCarousel ? "relative w-full mt-0 max-w-screen-lg" : ""
        }`}
      >
        {showCarousel && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 text-black text-2xl font-semibold"
            >
              <Image
                src={ForwardArrow}
                width={40}
                height={40}
                alt="Foward arrow"
                className="rotate-180"
                loading="lazy"
              />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 text-black text-2xl font-semibold"
            >
              <Image
                src={BackArrow}
                width={40}
                height={40}
                alt="Foward arrow"
                loading="lazy"
              />
            </button>
          </>
        )}

        <div
          className={`${
            showCarousel ? "overflow-hidden scrollbar-hide-carousel" : ""
          }`}
        >
          <div
            className={`${
              showCarousel
                ? "max-sm:w-max w-[280%] sm:w-[400%] md:w-[180%] flex transition-transform duration-500 ease-in-out"
                : `${
                    showBackgroundImage
                      ? "hidden"
                      : `max-lg:grid max-lg:px-5 max-sm:grid-cols-1 max-md:grid-cols-3 max-lg:grid-cols-5 lg:grid gap-x-4 gap-y-0 ${gridColumnsClass}`
                  }`
            }`}
            style={{
              transform: showCarousel
                ? `translateX(-${(currentIndex / totalSlides) * 100}%)`
                : "",
              width: showCarousel ? `` : "auto",
            }}
          >
            {relatedApps?.map((app, index) => (
              <div
                key={index}
                className={`py-2 ${
                  showCarousel
                    ? "min-w-[100px] text-nowrap h-max flex max-lg:mx-7 max-md:mx-3 lg:mx-auto"
                    : ""
                }`}
              >
                <Link
                  className={`${
                    showCarousel
                      ? "flex items-center bg-slate-200 rounded-xl p-3 gap-5 w-full text-center"
                      : `flex ${columns > 4 ? "flex-col items-center shadow-lg p-2 rounded-none hover:bg-slate-300 transition duration-500 ease-in-out" : "gap-2 flex-row-reverse justify-between shadow-lg p-2 rounded-none hover:bg-slate-300 transition duration-500 ease-in-out border-l-4 border-orange-600 hover:border-green-500"} link`
                  }`}
                  href={`/apps/${app.slug}`}
                >
                  <div className="flex items-center">
                    {/* <p
                      className={`${
                        showCarousel
                          ? "text-6xl text-gray-400 font-semibold max-sm:hidden"
                          : "hidden"
                      }`}
                    >
                      {index + 1}
                    </p> */}
                    <Image
                    
                      src={app.appLogo.src}
                      width={logoSize}
                      loading="eager"
                      quality={10}
                      height={logoSize}
                      sizes="(max-width: 600px) 400px, 800px" 
                      alt={app.appLogo.alt}
                      className={`shrink-0 overflow-hidden ${
                        showCarousel
                          ? "self-auto w-16 h-16 max-h-16 max-w-16 rounded-xl"
                          : "max-lg:rounded-2xl lg:rounded-3xl min-w-12 aspect-square w-12 sm:w-20 self-start border border-line border-b-4"
                      }`}
                    />
                  </div>
                  <div
                    className={`${
                      columns > 4
                        ? "flex flex-col mt-2"
                        : "self-center flex flex-col gap-1"
                    }`}
                  >
                    <h3
                      className={`font-normal ${
                        showCarousel
                          ? "text-sm text-gray-500"
                          : "text-[17px] line-clamp-1"
                      }`}
                    >
                      {app.title}
                    </h3>
                    <p
                      className={`${showCarousel ? "hidden" : ""} ${
                        showBackgroundImage
                          ? ""
                          : "text-xs text-gray-500 font-medium line-clamp-1"
                      }`}
                    >
                      {app.developer}
                    </p>
                    <div
                      className={`${showCarousel ? "hidden" : ""} ${
                        showBackgroundImage ? "" : "flex items-center gap-1"
                      }`}
                    >
                      <p className="text-xs text-[#666666]">
                        {app?.ratings?.totalRatings.toFixed(1)}
                      </p>
                      <Image
                      
                        src={Star}
                        width={15}
                        height={15}
                        alt="star logo"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppsByTag;
