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

  const contentType = slice.primary.content_type || "Blog";
  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>

      {/* Render description if available */}
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      {/* Conditional Rendering: Only render the content list for projects */}
      {contentType === "Project" && (
        <ContentList
          items={items}
          contentType={contentType}
          viewMoreText={slice.primary.view_more_text}
          fallbackItemImage={slice.primary.fallback_item_image}
        />
      )}

      {/* For Blogs: If no list, render nothing further */}
      {contentType === "Blog" && (
        <div className="text-center text-gray-400 mt-10">
          {/* Optional: You could add more content or keep this empty */}
        </div>
      )}
    </Bounded>
  );
};

export default ContentIndex;


