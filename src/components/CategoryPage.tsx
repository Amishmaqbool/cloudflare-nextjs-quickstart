"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryProps } from "@/lib/type";
import Star from "@/assets/svgs/star.svg";

interface CategoryPageProps {
  categoriesPage: {
    title: string;
    category: CategoryProps;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoriesPage }) => {
  const { category } = categoriesPage;
  const [showAll, setShowAll] = useState(false);

  if (!category || !category.relatedApps) {
    return <div>Category not found</div>;
  }

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedApps = showAll
    ? category.relatedApps
    : category.relatedApps.slice(0, 6);

  return (
    <div className="container w-full mx-auto flex flex-col gap-3">
      <div className="p-6 flex flex-col gap-4 pl-0 pt-0">
        <div className="flex items-center text-xs">
          <Link
            href="/"
            className="hover:underline font-medium hover:text-gray-700"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-700">{category.title}</span>
        </div>

        <h1 className="text-2xl font-semibold">{category.title}</h1>

        {category.relatedApps.length > 0 ? (
          <div>
            <ul className="space-y-4 gap-5 max-[500px]:grid-cols-3 grid-cols-4  sm:grid-cols-5 grid lg:grid-cols-6 items-baseline">
              {displayedApps.map((app) => (
                <Link
                  href={`/apps/${app.slug}`}
                  key={app.slug}
                  className="flex flex-col gap-2 link items-start space-x-4 overflow-hidden max-w-[150px] text-nowrap text-ellipsis"
                >
                  {app.appLogo && (
                    <Image
                      src={app.appLogo.src}
                      alt={app.appLogo.alt}
                      width={app.appLogo.width}
                      height={app.appLogo.height}
                      className="self-start shrink-0 rounded-3xl overflow-hidden border border-line border-b-4"
                      loading="lazy"
                      
                    />
                  )}
                  <h3 className="text-sm font-semibold">{app.title}</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-[#666666]">
                      {app?.ratings?.totalRatings === 0
                        ? "0.0"
                        : app?.ratings?.totalRatings.toFixed(1)}
                    </p>
                    <Image
                      loading="lazy"
                      src={Star}
                      width={15}
                      height={15}
                      alt="star logo"
                      
                    />
                  </div>
                </Link>
              ))}
            </ul>
            {category.relatedApps.length > 6 && (
              <button
                onClick={toggleShowAll}
                className="border border-green-700 rounded-lg w-full py-2 text-green-700 font-semibold hover:bg-[#059669] hover:text-white transition duration-500 text-center flex justify-center items-center mt-4"
              >
                {showAll ? "Show less" : "See more"}
              </button>
            )}
          </div>
        ) : (
          <h1>No tools found</h1>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
