import getCollection, { URLS_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// @ts-expect-error — Next.js 15 breaks param typing in dynamic routes
export default async function RedirectPage({ params }) {
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias: params.alias });

    if (result) {
        redirect(result.url);
    }

    return <p className="p-4 text-red-500 text-center">Alias not found</p>;
}
