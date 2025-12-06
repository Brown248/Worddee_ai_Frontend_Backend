import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <h1 className="text-4xl font-serif font-bold text-brand-dark">Welcome to Worddee.ai</h1>
      <p className="text-gray-600 max-w-md">
        Master English vocabulary through AI-powered sentence practice.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/word-of-the-day" 
          className="bg-brand-dark text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition shadow-lg font-medium"
        >
          Start Practicing
        </Link>
        <Link 
          href="/my-progress" 
          className="bg-white text-brand-dark border border-brand-dark px-8 py-3 rounded-full hover:bg-gray-50 transition shadow-sm font-medium"
        >
          View Progress
        </Link>
      </div>
    </div>
  );
}