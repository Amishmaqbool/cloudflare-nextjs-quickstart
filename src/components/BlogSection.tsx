import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogProps } from "@/lib/type";

const CategoriesSection: React.FC<BlogProps> = ({ title, blogPosts }) => {
  if (blogPosts?.length === 0) {
    return <p>No blogs found</p>;
  }
  return (
    <div className="mt-8">
      <h2 className="text-xl max-lg:ml-5 block font-semibold text-gray-900 pb-4">
        {title}
      </h2>
      <div className="overflow-auto grid gap-4 grid-flow-col auto-cols-max -mx-4 px-4 lg:px-0 lg:mx-0 lg:grid-cols-3 lg:grid-flow-row max-lg:mr-4 lg:pr-8">
        {blogPosts?.map((blogPost) => (
          <Link
            href={`/blogs/${blogPost.slug}`}
            key={blogPost.slug}
            className="border max-lg:first:ml-5 rounded-2xl overflow-hidden max-lg:max-w-72 lg:w-full flex flex-col bg-white"
          >
            {blogPost.blogImage && (
              <Image
                src={blogPost.blogImage.src}
                width={blogPost.blogImage.width}
                height={blogPost.blogImage.height}
                alt={blogPost.blogImage.alt}
                className="relative lg:h-56 lg:w-full"
                loading="lazy"
                sizes="(max-width: 600px) 400px, 800px" 
                
              />
            )}
            <div className="flex-grow relative p-6 flex flex-col justify-start">
            <h3 className="line-clamp-1 ml-0 mt-2 overflow-hidden text-gray-500 text-lg font-medium lg:min-h-[40px]">
              {blogPost.title}
            </h3>
            <p className="text-gray-500 mb-8 line-clamp-3">
            {blogPost?.description}
            </p>
            <p className="absolute bottom-6 line-clamp-1 ml-0 overflow-hidden text-gray-500 text-xs font-medium">
              {blogPost?.blogPostIssueDate}
            </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
