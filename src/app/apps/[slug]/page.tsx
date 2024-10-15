/* eslint-disable @typescript-eslint/no-explicit-any */
import { getObject } from "@/lib/contentful";
import AppsPage from "@/components/AppsPage";
import AppsByTag from "@/components/AppsByTag";
import Layout from "@/layout/layout";

interface PageProps {
  params: { slug: string };
}
export const runtime = 'edge';

export async function generateMetadata({ params }: PageProps) {
  const appsPage = (await getObject("appsPage", {
    "fields.slug": params.slug,
    include: '3',
  })) as any;

  if (!appsPage || !appsPage.app) {
    return {
      title: "Page Not Found - 111 Apps",
      description: "The page you are looking for does not exist.",
    };
  }

  const appTitle = appsPage.app.title || "App";

  return {
    title: `${appTitle} - 111 Apps`,
    description: `Explore ${appTitle} and discover its features. Download it now and enhance your experience with this top-rated app.`,
    openGraph: {
      title: `${appTitle} - 111 Apps`,
      description: `Explore ${appTitle} and discover its features. Download it now and enhance your experience with this top-rated app.`,
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

const AppPage = async ({ params }: PageProps) => {
  const appsPage = (await getObject("appsPage", {
    "fields.slug": params.slug,
    include: '3',
  })) as any;


  if (!appsPage) {
    return <div>Page not found</div>;
  }


  return (
    <Layout isSidebarVisible={true}>
      <div className="flex justify-between items-center max-lg:mr-5 lg:container lg:mx-auto lg:px-5 lg:ml-10 mt-7">
        <div className="flex gap-3">
          <div className="">
            <AppsPage appsPage={appsPage} />
            <div className="bg-white p-5 rounded-b-lg lg:w-[70%]">
              <AppsByTag
                title={appsPage.similarApps.title}
                relatedApps={appsPage.similarApps.relatedApps}
                columns={2}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppPage;
