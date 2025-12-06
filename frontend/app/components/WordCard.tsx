import Image from 'next/image';

interface Props {
  data: any;
}

export default function WordCard({ data }: Props) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-200">
        <Image
          src={data.image_url || fallbackImage}
          alt={data.word}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex-1 pt-2">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-4xl font-serif text-gray-900">• {data.word}</h1>
          <span className="bg-[#fdf6e7] text-[#9a7b4f] text-xs font-bold px-3 py-1 rounded-full border border-[#f5e3c2]">
            Level {data.level}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6">/{data.word.toLowerCase()}/</p>

        <div className="space-y-4">
          <div>
            <span className="font-bold text-gray-900 text-sm mr-2">Meaning:</span>
            <span className="text-gray-600 text-sm">{data.meaning}</span>
          </div>

          <div className="text-gray-500 text-sm italic border-l-2 border-gray-300 pl-3">
            "{data.example}"
          </div>
        </div>
      </div>
    </div>
  );
}
