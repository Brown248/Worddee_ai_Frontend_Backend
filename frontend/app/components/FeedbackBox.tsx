import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  result: any;
  userSentence: string;
  onClose: () => void;
}

export default function FeedbackBox({ result, userSentence, onClose }: Props) {
  const isGood = result.score >= 7;

  return (
    <div className="bg-white rounded-[20px] p-10 shadow-xl border border-gray-100 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#1a3c3c] mb-8">Challenge completed</h2>
        
        <div className="flex justify-center gap-4 mb-8">
            <span className="bg-[#fef9c3] text-[#854d0e] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
               Level {result.level}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide text-white ${isGood ? 'bg-[#1a3c3c]' : 'bg-orange-500'}`}>
               Score {result.score}
            </span>
        </div>

        <div className="text-left space-y-4 mb-8">
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 uppercase font-bold mb-2">Your Sentence</p>
                <p className="text-gray-800 text-lg">{userSentence}</p>
             </div>

             <div className={`p-5 rounded-xl border ${isGood ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fff7ed] border-[#fed7aa]'}`}>
                <div className="flex items-center gap-2 mb-2">
                   {isGood ? <CheckCircle className="text-green-600 w-5 h-5"/> : <XCircle className="text-orange-500 w-5 h-5"/>}
                   <p className={`text-sm font-bold uppercase ${isGood ? 'text-green-800' : 'text-orange-800'}`}>
                      AI Suggestion
                   </p>
                </div>
                <p className={`text-sm mb-3 ${isGood ? 'text-green-700' : 'text-orange-700'}`}>{result.suggestion}</p>
                <div className="bg-white/60 p-3 rounded-lg">
                   <p className={`font-medium ${isGood ? 'text-green-900' : 'text-orange-900'}`}>{result.corrected_sentence}</p>
                </div>
             </div>
        </div>

        <div className="flex justify-center items-center gap-6">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-medium">
                Close
            </button>
            <Link href="/my-progress" className="bg-[#1a3c3c] text-white pl-6 pr-5 py-3 rounded-full hover:bg-[#153030] shadow-lg flex items-center gap-2 transition">
                View my progress <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    </div>
  );
}