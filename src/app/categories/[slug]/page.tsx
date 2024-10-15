/* eslint-disable @typescript-eslint/no-explicit-any */
import { getObject, getAllObjects } from "@/lib/contentful";
import CategoryPage from "@/components/CategoryPage";
import AppsByTag from "@/components/AppsByTag";
import CategoriesSection from "@/components/CategoriesSection";
import Layout from "@/layout/layout";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const categoriesPage = (await getObject("categoriesPage", {
    "fields.slug": params.slug,
    include: '3',
  })) as any;

  if (!categoriesPage || !categoriesPage.category) {
    return {
      title: "Category Not Found - 111 Apps",
      description: "The category you are looking for does not exist.",
    };
  }

  const categoryTitle = categoriesPage.category.title || "Category";

  return {
    title: `${categoryTitle} Archives - 111 Apps`,
    description: `Explore the top apps in the ${categoryTitle} category and discover the most popular and highly rated apps. Download now and enhance your experience.`,
    openGraph: {
      title: `${categoryTitle} - 111 Apps`,
      description: `Explore the top apps in the ${categoryTitle} category and discover the most popular and highly rated apps. Download now and enhance your experience.`,
      images: [
        {
          url: "https://images.ctfassets.net/7b8fcta4shze/1dvtQq3KWJfwfksd9H1SBx/f8921a99e839826f2e14d31698302c0a/Screenshot-2024-09-17-at-9.15.17_PM.webp",
          alt: "Screenshot",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  };
}

const CategoriesPage = async ({ params }: { params: { slug: string } }) => {
  const categoriesPage = (await getObject("categoriesPage", {
    "fields.slug": params.slug,
    include: '3',
  })) as any;
  
  let categories = (await getAllObjects("categories", {
    include: '3',
  })) as any;

  categories = categories.sort((a: { title: string }, b: { title: string }) => 
    a.title.localeCompare(b.title)
  );

  if (!categoriesPage) {
    return <div>Category not found</div>;
  }


  return (
    <Layout isSidebarVisible={false}>
      <div className="flex justify-between items-center container px-0 mb-4">
        <div className="ml-2 flex gap-2 max-lg:flex-col">
          <div className="lg:w-[75%] flex flex-col gap-10">
            <CategoryPage categoriesPage={categoriesPage} />
            <CategoriesSection title={"Popular Categories"} slug={categories.slug} relatedCategories={categories} />
          </div>
          <div className="">
            <AppsByTag title={categoriesPage.topDownloads.title} relatedApps={categoriesPage.topDownloads.relatedApps} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
