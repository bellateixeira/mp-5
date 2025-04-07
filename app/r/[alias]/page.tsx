import getCollection, { URLS_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: { params: { alias: string } }) {
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias: params.alias });

    if (result) {
        redirect(result.url);
    } else {
        return <p className="p-4 text-red-500">Alias not found</p>;
    }
}
