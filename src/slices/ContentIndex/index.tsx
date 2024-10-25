import Image from "next/image";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({ slice }: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const contentType = slice.primary.content_type ?? "Blog"; // Handle nullish value
  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Heading size="xl" className="mb-8">
        {slice.primary.heading ?? "Untitled"} {/* Handle potential null heading */}
      </Heading>

      {/* Render description if available */}
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      {/* Display an image for Blogs */}
      {contentType === "Blog" && (
        <div className="relative w-full max-w-3xl mx-auto mb-10">
          <Image
            src="/watch.jpg" 
            alt="Blog Placeholder Image"
            layout="responsive" // Use responsive layout for better fitting
            width={800} // Set a reasonable width
            height={450} // Maintain the correct aspect ratio
            className="rounded-lg"
          />
        </div>
      )}

      {/* Render the content list only for projects */}
      {contentType === "Project" && (
        <ContentList
          items={items}
          contentType={contentType}
          viewMoreText={slice.primary.view_more_text ?? "View More"} // Handle null value
          fallbackItemImage={slice.primary.fallback_item_image}
        />
      )}
    </Bounded>
  );
};

export default ContentIndex;





