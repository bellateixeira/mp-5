'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alias }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setShortUrl(data.shortUrl);
      }
    } catch (err) {
      setError('Unexpected error occurred. Check console for details.');
      console.error(err);
    }
  };

  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-pink-50">
        <h1 className="text-3xl font-bold mb-2 text-pink-700">URL Shortener</h1>
        <p className="text-pink-600 mb-6">
          Paste a long URL, add a custom alias, and get a short link you can share!
        </p>

        <div className="bg-white border border-pink-200 rounded-xl shadow-md p-6 w-full max-w-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Enter a full URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
            />
            <input
                type="text"
                placeholder="Enter alias (e.g., my-link)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="border border-pink-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
            />
            <button
                type="submit"
                className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 cursor-pointer transition"
            >
              Shorten
            </button>
          </form>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {shortUrl && (
            <div className="mt-4">
              <p>
                Short URL:{' '}
                <a href={shortUrl} className="text-pink-600 underline" target="_blank">
                  {shortUrl}
                </a>
              </p>
              <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="mt-2 bg-pink-100 px-3 py-1 rounded hover:bg-pink-200 cursor-pointer transition"
              >
                Copy
              </button>
            </div>
        )}
      </main>
  );
}
