import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryProps } from "@/lib/type";

const CategoriesSection: React.FC<CategoryProps> = ({
  title,
  relatedCategories,
}) => {
  if (relatedCategories?.length === 0) {
    return <p>No categories found</p>;
  }
  relatedCategories = relatedCategories.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  return (
    <div className="mt-8">
      <h2 className="text-xl max-lg:ml-5 block font-semibold text-gray-900 pb-4">
        {title}
      </h2>
      <div className="gap-2 sm:gap-4 max-lg:px-5 max-w-screen-xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:pr-5 items-center">
        {relatedCategories?.map((category) => (
          <Link
            href={`/categories/${category.slug}`}
            key={category.slug}
            className="flex flex-col gap-3 w-full cursor-pointer p-4 py-3 -ml-1 rounded-none transition duration-500 hover:bg-white border border-gray-200 items-center"
          >
            {category.categoryLogo && (
              <Image
                src={category.categoryLogo.src}
                width={50}
                height={50}
                alt={category.categoryLogo.alt}
                className="rounded"
                loading="lazy"
                
              />
            )}
            <span className="max-w-[104px] sm:max-w-[150px] lg:max-w-[130px] xl:max-w-[120px] 2xl:max-w-[150px] text-center m-0 overflow-hidden text-gray-500 text-sm font-normal text-nowrap text-ellipsis">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
