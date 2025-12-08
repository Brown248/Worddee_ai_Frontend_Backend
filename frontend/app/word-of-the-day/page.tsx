'use client';

import { WordData, AIResult } from '@/types'; // บรรทัดนี้จะหายแดงถ้าย้ายโฟลเดอร์ถูกต้อง
import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FeedbackBox from '../components/FeedbackBox'; // เช็คว่าไฟล์นี้มีอยู่จริงด้วยนะครับ

const API_BASE = '/python-api'; 

export default function WordOfTheDay() {
  const [word, setWord] = useState<WordData | null>(null);
  const [sentence, setSentence] = useState('');
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    setLoading(false);
    setResult(null);
    setSentence('');
    setWord(null);
    try {
      const res = await axios.get(`${API_BASE}/word`);
      // Fake delay เพื่อความสวยงามของ Animation
      setTimeout(() => setWord(res.data), 500);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async () => {
    if (!word || !sentence.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/validate-sentence`, {
        word: word.word,
        sentence: sentence
      });
      setResult(res.data);
    } catch (err) {
      alert("Error contacting AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-10 px-4">
      {/* State 1: Skeleton Loading */}
      {!word && !result && (
        <div className="bg-white rounded-[20px] p-8 border border-gray-100 flex flex-col md:flex-row gap-8 animate-pulse">
           <div className="w-full md:w-[320px] h-[320px] bg-gray-200 rounded-xl"></div>
           <div className="flex-1 space-y-4 py-4">
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
           </div>
        </div>
      )}

      {/* State 2: Input Card */}
      {word && !result && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[20px] p-8 shadow-card border border-gray-100 flex flex-col md:flex-row gap-8"
        >
          <div className="w-full md:w-[320px] h-[320px] rounded-xl overflow-hidden relative shadow-inner bg-gray-100 flex-shrink-0">
             <Image 
               src={word.image_url} 
               alt={word.word} 
               fill 
               className="object-cover hover:scale-105 transition duration-700" 
             />
          </div>

          <div className="flex-1 flex flex-col">
             <div className="flex justify-between items-start mb-2">
                <div>
                   <h1 className="text-4xl font-serif font-bold text-[#1a3c3c] mb-1">{word.word}</h1>
                   <p className="text-gray-400 font-sans">/{word.word.toLowerCase()}/</p>
                </div>
                <span className="bg-[#fef9c3] text-[#854d0e] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                   Level {word.level}
                </span>
             </div>

             <div className="mt-4 mb-6 space-y-3">
                <div className="text-sm">
                   <span className="font-bold text-gray-900 block mb-1">Meaning:</span>
                   <span className="text-gray-600 leading-relaxed">{word.meaning}</span>
                </div>
                <div className="bg-gray-50 border-l-4 border-gray-200 p-3 italic text-gray-500 text-sm">
                   "{word.example}"
                </div>
             </div>

             <textarea 
                className="w-full flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1a3c3c] focus:bg-white transition resize-none mb-4"
                placeholder="Compose a sentence using this word..."
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
             />

             <div className="flex gap-3 justify-end mt-auto">
                <button 
                   onClick={fetchWord} 
                   className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-500 font-medium hover:bg-gray-50 transition"
                >
                   Skip
                </button>
                <button 
                  onClick={submit}
                  disabled={!sentence.trim()}
                  className="px-8 py-2.5 rounded-full bg-[#1a3c3c] text-white font-medium hover:bg-[#153030] shadow-lg disabled:opacity-50 disabled:shadow-none transition transform active:scale-95"
                >
                  Submit
                </button>
             </div>
          </div>
        </motion.div>
      )}

      {/* State 3: Processing Loading */}
      {loading && (
        <div className="bg-white rounded-[20px] p-12 shadow-card border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a3c3c] mb-4"></div>
           <p className="text-gray-500 animate-pulse">AI is analyzing your grammar...</p>
        </div>
      )}

      {/* State 4: Result */}
      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
           <FeedbackBox result={result} userSentence={sentence} onClose={fetchWord} />
        </motion.div>
      )}
    </div>
  );
}