interface Props {
  result: any;
  userSentence: string;
  onClose: () => void;
}

export default function FeedbackBox({ result, userSentence, onClose }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-serif text-center mb-6 text-[#1a3c3c]">Challenge completed</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-500 mb-1">Your sentence:</p>
            <p className="text-gray-800">{userSentence}</p>
        </div>

        <div className="bg-[#f0fdf4] border border-[#dcfce7] p-4 rounded-lg mb-6">
             <div className="flex justify-between items-center mb-2">
                <span className="text-green-800 font-bold text-sm">Suggestion</span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">Score: {result.score}</span>
             </div>
             <p className="text-green-700 text-sm mb-2">{result.suggestion}</p>
             <p className="text-green-900 font-medium text-sm">{result.corrected_sentence}</p>
        </div>

        <div className="flex justify-center">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-sm underline">
                Close
            </button>
        </div>
    </div>
  );
}