/* eslint-disable @typescript-eslint/no-explicit-any */
import { getObject } from "@/lib/contentful";
import Layout from "@/layout/layout";
import { LegalPageProps } from "@/lib/type";
import Link from "next/link";
import { marked } from "marked";
// 
export async function generateMetadata({ }: { params: { slug: string } }) {
  const page = (await getObject("legalPages", {
    "fields.slug": "privacy-policy",
    include: '3',
  })) as unknown as LegalPageProps;

  if (!page || !page.title) {
    return {
      title: "Page Not Found - 111 Apps",
      description: "The page you are looking for does not exist.",
    };
  }

  return {
    title: `111 Apps - ${page.title}`,
    // description: page.description || `Explore the ${page.title} at 111 Apps.`,
    openGraph: {
      title: `111 Apps - ${page.title}`,
      //   description: page.description || `Explore the ${page.title} at 111 Apps.`,
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

const Page = async ({ }: { params: { slug: string } }) => {
  const page = (await getObject("legalPages", {
    "fields.slug": "privacy-policy",
    include: '3',
  })) as unknown as LegalPageProps;

  if (!page) {
    return <div>Page not found</div>;
  }
  const { bodyCopy } = page;
  const bodyCopyHtml = typeof bodyCopy === 'string' ? marked(bodyCopy) : '';
  return (
    <Layout isSidebarVisible={false}>
      <div className="max-w-[1000px] min-h-[calc(100vh-260px)] lg:px-[1rem] max-lg:pr-[2rem] mx-auto mt-2 max-lg:mt-4">
      <div className="flex items-center text-xs">
          <Link
            href="/"
            className="hover:underline font-medium hover:text-gray-700"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">&gt;</span>
          <span className="text-gray-700">{page.title}</span>
        </div>
      <h1 className="text-black font-semibold text-[20px] my-5">{page.title}</h1>
      <div
          className="mb-7 prose prose-strong:font-bold prose-strong:text-[#666666] prose-ol:p-[0px] prose-ol:ml-4 prose-p:text-[#66666] leading-6 text-[16px] font-normal block max-w-none text-[#666666]"
          dangerouslySetInnerHTML={{ __html: bodyCopyHtml }}
        />
      </div>
    </Layout>
  );
};

export default Page;
