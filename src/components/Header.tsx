import React from "react";
import { createClient } from "@prismicio/client";
import Link from "next/link";

export default async function Header() {
    const endpoint = process.env.NEXT_PUBLIC_PRISMIC_API_ENDPOINT;
    
    if (!endpoint) {
        throw new Error("Prismic API endpoint is not defined in environment variables.");
    }

    const client = createClient(endpoint);
    const settings = await client.getSingle("settings");
    return (
        <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
            <nav>
                <ul>
                    <li>
<Link href ="/" aria-label="Home Page">
{settings.data.name}
</Link>
                    </li>
                    <li>

                    </li>
                </ul>
            </nav>

        </header>
    )
}