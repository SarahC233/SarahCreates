import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";

import ContentBody from "@/components/ContentBody"; // Import the new ContentBody component

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  // Render the ContentBody component and pass the page data
  return <ContentBody page={page} />;
}

// Function to generate metadata (like title, description) for the page
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

// Generate static paths for pre-rendering based on existing content
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
