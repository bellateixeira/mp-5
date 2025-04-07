import { NextResponse } from 'next/server';
import getCollection, { URLS_COLLECTION } from '@/db';

export async function POST(req: Request) {
    const { url, alias } = await req.json();

    try {
        new URL(url); // Validate URL format
    } catch {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const collection = await getCollection(URLS_COLLECTION);
    const existing = await collection.findOne({ alias });

    if (existing) {
        return NextResponse.json({ error: 'Alias already taken' }, { status: 409 });
    }

    await collection.insertOne({ alias, url });

    return NextResponse.json({
        shortUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/r/${alias}`,
    });
}
