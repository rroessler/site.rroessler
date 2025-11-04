/// Vendor Modules
import * as xml from 'xmlbuilder2';
import { NextResponse } from 'next/server';

/// Package Modules
import { Router } from '@/router';
import { Product } from '@/product';

/** Ensure using a dynamic export now. */
export const dynamic = 'force-static';

/** Gets the "feed.xml" details. */
export async function GET() {
    // prepare the baseline RSS instance
    const rss = xml.create({ encoding: 'UTF-8' }).ele('rss').att(null, 'version', '2.0');

    // prepare the channel node now
    const channel = rss.ele('channel');

    // bind all the channel properties now
    channel.ele('title').txt(Product.title);
    channel.ele('link').txt(Product.website);
    channel.ele('description').txt(Product.description);

    const posts = await Router.Posts.list(); // prepare the posts/items now
    const items = posts.map((post) => [channel.ele('item'), post] as const);

    // bind all the available posts now
    for (const [item, { route, title, frontMatter }] of items) {
        if (!title) continue; // ignore invalid
        item.ele('title').txt(title.toString());
        item.ele('link').txt(Product.website + route);
        item.ele('description').txt(frontMatter?.description ?? '');
        item.ele('pubDate').txt(new Date(frontMatter?.date).toUTCString());
    }

    // and respond as necessary now
    return new NextResponse(rss.end({ prettyPrint: true }), { headers: { 'Content-Type': 'application/rss+xml' } });
}
