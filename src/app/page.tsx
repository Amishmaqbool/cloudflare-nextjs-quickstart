/* eslint-disable @typescript-eslint/no-explicit-any */
import { getObject } from "@/lib/contentful";
import DynamicContentRenderer from "@/components/DynamicContentRenderer";
import { PageProps } from "@/lib/type";
import Layout from "@/layout/layout";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import BackgroundImage from "@/assets/images/marquee_blue_patterned.jpg";

export async function generateMetadata() {
  const page = (await getObject("page", {
    "fields.slug": "home",
    include: "3",
  })) as unknown as PageProps;

  if (!page || !page.title) {
    return {
      title: "Page Not Found - 111 Apps",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `111 Apps - Review & Download the latest Apps`,
    description: `111 Apps is your go-to platform for discovering, reviewing, and downloading the best apps and games. Browse categories, check ratings, and enjoy seamless app updates.`,
    openGraph: {
      title: `111 Apps - Review & Download the latest Apps`,
      description: `111 Apps is your go-to platform for discovering, reviewing, and downloading the best apps and games. Browse categories, check ratings, and enjoy seamless app updates.`,
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

const Home = async ({ params }: { params: { slug: string } }) => {
  const page = (await getObject("page", {
    "fields.slug": params.slug,
    include: "3",
  })) as unknown as PageProps;

  if (!page) {
    return <div>Page not found</div>;
  }
  return (
    <Layout isSidebarVisible={true}>
      <div className="px-2 relative sm:px-8 pb-5 w-full">
        <Image
          src={BackgroundImage}
          alt="ImageOne"
          width={300}
          height={300}
          className="absolute rounded-md w-full h-full object-fill left-0 top-0 max-lg:p-4 lg:p-10 z-[0]"
        />
        <div className="max-lg:p-4 lg:p-10 sm:py-20 rounded-md relative z-[10]">
          <h1 className="text-xl sm:text-3xl pt-10 md:text-5xl text-black font-medium pb-10">
            The Best
            <br /> apps in One place
          </h1>
          <SearchInput
            isMobile={false}
            padding="p-5 pr-8"
            width="w-[600px]"
            height="h-[70px]"
            borderRadius="2xl"
            backgroundColor="white"
          />
          <SearchInput
            isMobile={true}
            padding="p-5 pr-8"
            width="w-[50vw]"
            height="h-[50px]"
            borderRadius="2xl"
            backgroundColor="white"
          />
        </div>
      </div>

      <div className="flex lg:ml-10 flex-col gap-0 max-w-screen-2xl mx-auto">
        {page?.sections && <DynamicContentRenderer sections={page.sections} />}
      </div>
    </Layout>
  );
};

export default Home;
