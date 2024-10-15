import { getAllObjects } from "@/lib/contentful";
import Image from "next/image";
import AppsLogo from "@/assets/svgs/appslogo.svg";
import Link from "next/link";
import { CategoryProps } from "@/lib/type";

const Sidebar = async () => {
  let categories = (await getAllObjects(
    "categories"
  )) as unknown as CategoryProps[];
  categories = categories.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="overflow-auto max-lg:hidden h-screen w-[280px] bg-white p-6 shadow-lg sticky top-0 rounded-lg scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Sidebar Header */}
      <div className="flex gap-3 items-center mb-6">
        <Image
          loading="lazy"
          src={AppsLogo}
          alt="AppsLogo"
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-semibold text-gray-900">Apps</h1>
      </div>

      {/* Category List */}
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/categories/${category.slug}`}
              className="flex items-center p-3 text-gray-700 font-medium rounded-lg transition-colors duration-300 hover:bg-gray-100 hover:text-black hover:shadow-sm space-x-3"
            >
              {/* Category Icon */}
              {category.categoryLogo && (
                <Image
                  src={category.categoryLogo.src}
                  width={20}
                  height={20}
                  alt={category.categoryLogo.alt}
                  className="rounded"
                  loading="lazy"
                />
              )}
              {/* Category Title */}
              <span className="text-sm">{category.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
