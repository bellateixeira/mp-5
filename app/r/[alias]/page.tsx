import { Metadata } from 'next';
import getCollection, { URLS_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

type Props = {
    params: {
        alias: string;
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Redirecting to: ${params.alias}`,
    };
}

export default async function RedirectPage({ params }: Props) {
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias: params.alias });

    if (result) {
        redirect(result.url);
    } else {
        return <p className="p-4 text-red-500">Alias not found</p>;
    }
}
