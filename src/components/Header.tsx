import React from "react";
import { createClient } from "@/prismicio"; // Import your custom createClient
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

export default async function Header() {
    // Create Prismic client
    const client = createClient(); // No need for endpoint, use your custom createClient
    const settings = await client.getSingle("settings");

    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
            <nav>
                <ul>
                    <li>
                        <Link href="/" aria-label="Home Page">
                            {settings.data.name}
                        </Link>
                    </li>
                    {settings.data.nav_item.map(({ link, label }, index) => (
                        <li key={index}>
                            <PrismicNextLink field={link}>
                                {label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
