import getCollection, { URLS_COLLECTION } from '@/db';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RedirectPage(
    props: { params: { alias: string } }
) {
    const { alias } = props.params;
    const collection = await getCollection(URLS_COLLECTION);
    const result = await collection.findOne({ alias });

    if (result) {
        redirect(result.url);
    }

    return <p className="p-4 text-red-500 text-center">Alias not found</p>;
}
