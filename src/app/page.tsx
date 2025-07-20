type Video = { id: string; video_url?: string; captions?: string };

import Link from "next/link";

async function getVideos() {
  const res = await fetch(process?.env?.NEXT_PUBLIC_API_URL as string, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const videos: Video[] = await getVideos();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Video Lessons</h1>
      <Link
        href="/upload"
        className="underline text-blue-600 hover:text-blue-800"
      >
        Upload New Video
      </Link>
      <ul className="mt-6 space-y-3">
        {videos.length === 0 && (
          <li className="text-gray-500">No videos yet.</li>
        )}
        {videos.map((v: Video) => (
          <li
            key={v.id}
            className="p-3 bg-white rounded shadow flex items-center justify-between"
          >
            <span className="truncate">{v.id}</span>
            <Link
              href={`/videos/${v.id}`}
              className="text-blue-600 hover:underline"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
