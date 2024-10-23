import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { isFilled, DateField } from "@prismicio/client";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  // Function to format the date as day-month-year
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };

      return new Intl.DateTimeFormat("en-GB", dateOptions).format(new Date(date));
    }
    return null; // Return null if the date is not valid
  }

  return (
    <Bounded as="article">
      {/* Wrap both the heading section and SliceZone in the styled div */}
      <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:py-20 text-accent text-xl font-bold">
        <Heading as="h1">{page.data.title}</Heading>
        <div className="flex gap-4">
          {page.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        
        {/* Add the slate-400 class to the date */}
        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">{formatDate(page.data.date)}</p>
<div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">

        <SliceZone slices={page.data.slices} components={components} />
</div>
      </div>
    </Bounded>
  );
}


export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
