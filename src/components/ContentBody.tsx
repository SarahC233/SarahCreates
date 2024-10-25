import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled, DateField } from "@prismicio/client";

export default function ContentBody({
  page,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
}) {
  // Function to format the date as day-month-year
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      return new Intl.DateTimeFormat("en-GB", dateOptions).format(
        new Date(date)
      );
    }
    return null; // Return null if the date is not valid
  }

  return (
    <Bounded as="article">
      {/* Wrap both the heading section and SliceZone in the styled div */}
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20 text-accent text-xl font-bold">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex flex-wrap gap-4 mt-4">
          {page.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>

        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formatDate(page.data.date)}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
    </Bounded>
  );
}
