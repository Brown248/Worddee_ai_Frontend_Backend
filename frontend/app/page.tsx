import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">AI-Powered English Learning</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1a3c3c] mb-6 leading-tight animate-fade-in-up delay-100">
          Master English <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a3c3c] to-[#7a9e9f]">one word</span> at a time.
        </h1>
        
        <p className="text-gray-500 text-lg mb-10 max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-200">
          Practice writing sentences with our daily curated words. Get instant feedback on grammar and style from our advanced AI.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Link 
            href="/word-of-the-day" 
            className="bg-[#1a3c3c] text-white px-8 py-4 rounded-full hover:bg-[#153030] transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 font-bold"
          >
            Start Practicing <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            href="/my-progress" 
            className="bg-white text-[#1a3c3c] border border-gray-200 px-8 py-4 rounded-full hover:bg-gray-50 transition shadow-sm font-bold"
          >
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}