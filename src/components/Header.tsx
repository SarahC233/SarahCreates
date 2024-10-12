import React from "react";
import { createClient } from "@/prismicio"; // Import your custom createClient
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import NavBar from "@/components/NavBar";

export default async function Header() {
    // Create Prismic client
    const client = createClient(); // No need for endpoint, use your custom createClient
    const settings = await client.getSingle("settings");

    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
     <NavBar settings={settings}/>
        </header>
    );
}
