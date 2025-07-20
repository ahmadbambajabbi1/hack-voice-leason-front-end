import { notFound } from "next/navigation";

type VideoDetailPageProps = { params: { id: string } };

async function getVideo(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const data = await getVideo(params.id);
  if (!data) return notFound();
  return (
    <div className="max-w-2xl mx-auto p-6">
      <video
        src={data.video_url}
        controls
        className="w-full rounded shadow mb-6"
      />
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Local Language Captions</h2>
        <p>{data.captions}</p>
      </div>
    </div>
  );
}
