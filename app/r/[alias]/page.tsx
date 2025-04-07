import getCollection, { URLS_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

interface RedirectPageProps {
    params: {
        alias: string;
    };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias: params.alias });

    if (result) {
        redirect(result.url);
    }

    return <p className="p-4 text-red-500 text-center">Alias not found</p>;
}

