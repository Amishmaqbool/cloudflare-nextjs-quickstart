/* eslint-disable @typescript-eslint/no-explicit-any */
import { getObject } from "@/lib/contentful";
import Layout from "@/layout/layout";
import { marked } from "marked";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blogPost = await getObject('blogPost', { 'fields.slug': params.slug });

  if (!blogPost) {
    return {
      title: "Blog Post Not Found - 111 Apps",
      description: "The blog post you are looking for does not exist.",
    };
  }

  const blogTitle = blogPost.title || "Untitled";

  return {
    title: `${blogTitle} - 111 Apps`,
    description: `Read our latest blog post titled "${blogTitle}". Stay informed with the latest insights and updates.`,
    openGraph: {
      title: `${blogTitle} - 111 Apps`,
      description: `Explore the latest post: "${blogTitle}". Stay informed with up-to-date content.`,
      images: [
        {
          url: "https://images.ctfassets.net/7b8fcta4shze/1dvtQq3KWJfwfksd9H1SBx/f8921a99e839826f2e14d31698302c0a/Screenshot-2024-09-17-at-9.15.17_PM.webp",
          alt: "Blog Post Image",
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


const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const blogPost = await getObject('blogPost', { 'fields.slug': params.slug });
  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  const { title, bodyCopy } = blogPost;
  const bodyCopyHtml = typeof bodyCopy === 'string' ? marked(bodyCopy) : '';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:ml-[50px]">
        <h1 className="text-xl font-semibold mb-6">
          {typeof title === "string" || typeof title === "number" ? title : "Untitled"}
        </h1>
        <div
          className="prose prose-strong:font-semibold prose-strong:text-[#666666] prose-p:text-[#66666] leading-7 text-[17px] font-normal block max-w-none text-[#666666]"
          dangerouslySetInnerHTML={{ __html: bodyCopyHtml }}
        />
      </div>
    </Layout>
  );
};

export default BlogPostPage;
