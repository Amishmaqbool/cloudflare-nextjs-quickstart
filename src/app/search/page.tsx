import Layout from "@/layout/layout";
import { getAllObjects } from "@/lib/contentful";
import { AppProps } from "@/lib/type";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export const runtime = 'edge';
interface SearchPageProps {
  searchParams: { query?: string };
}

const createFuzzyRegEx = (query: string) => {
  const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fuzzyQuery = sanitizedQuery.split("").join(".*");
  return new RegExp(fuzzyQuery, "i");
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const query = searchParams.query || "";

  const apps = await getAllObjects("apps");
  const appList = apps as unknown as AppProps[];

  const filteredApps = query
    ? appList.filter((app) => {
        const fuzzyRegEx = createFuzzyRegEx(query);
        return fuzzyRegEx.test(app.title);
      })
    : appList;

  if (!filteredApps.length && query) {
    return notFound();
  }

  return (
    <Layout isSidebarVisible={true}>
      <div className="mx-auto mr-5 py-4">
        <h1 className="text-2xl font-medium mb-4">
          {query ? `Results for "${query}"` : "All Apps"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredApps.map((app: AppProps) => (
            <Link
              href={`/apps/${app.slug}`}
              key={app.objectId}
              className="link flex gap-4 items-center border p-4 rounded-lg"
            >
              {app.appLogo?.src && (
                <Image
                
                  src={app.appLogo.src}
                  width={50}
                  height={50}
                  alt={app.appLogo.alt || "App logo"}
                  className="w-16 h-16 rounded-xl overflow-hidden"
                  loading="lazy"
                />
              )}
              <div>
                <h3 className="text-xl font-normal">{app.title}</h3>
                <p className="text-sm text-gray-500">
                  Category: {app.category}
                </p>
                <p className="text-sm text-gray-500">
                  Downloads: {app.downloads}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
