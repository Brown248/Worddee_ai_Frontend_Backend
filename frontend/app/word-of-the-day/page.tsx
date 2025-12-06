'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import WordCard from '../components/WordCard';
import FeedbackBox from '../components/FeedbackBox';

// ✅ แก้ตรงนี้! ใช้ทางลัดที่เราเพิ่งสร้าง (ไม่ต้องมี http://localhost...)
const API_BASE = '/python-api'; 

export default function Page() {
  const [word, setWord] = useState<any>(null);
  const [sentence, setSentence] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/word`);
      setWord(res.data);
      setSentence('');
      setResult(null);
    } catch (err: any) {
      console.error("Error:", err);
      // แจ้งเตือนที่ชัดเจนขึ้น
      setError(`ไม่สามารถติดต่อ Backend ได้ (Status: ${err.response?.status || 'Network Error'})`);
    }
  };

  const submit = async () => {
    if (!word) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/validate-sentence`, {
        word: word.word,
        sentence: sentence
      });
      setResult(res.data);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  // --- ส่วนแสดงผล ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="bg-red-50 text-red-600 p-8 rounded-xl border border-red-200">
          <h3 className="text-xl font-bold mb-2">⚠️ ยังเชื่อมต่อไม่ได้</h3>
          <p className="mb-4">{error}</p>
          <div className="text-sm bg-white p-3 rounded text-left mb-4 text-gray-600">
            <strong>ลองเช็คตามนี้ครับ:</strong><br/>
            1. Backend (จอดำ) ต้องเปิดอยู่<br/>
            2. ถ้าเพิ่งแก้ next.config.mjs <b>ต้องปิด Frontend แล้วเปิดใหม่</b>
          </div>
          <button onClick={fetchWord} className="bg-red-600 text-white px-6 py-2 rounded-full">ลองใหม่</button>
        </div>
      </div>
    );
  }

  if (!word) return <div className="text-center mt-20 text-gray-400">Loading...</div>;

  if (result) return <div className="mt-10"><FeedbackBox result={result} userSentence={sentence} onClose={fetchWord} /></div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-serif font-bold text-gray-800 mb-1">Word of the day</h2>
        <WordCard data={word} />
        <div className="mt-8">
          <textarea 
            className="w-full p-4 bg-[#f9fafb] border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1a3c3c] resize-none"
            rows={4}
            placeholder={`Write a sentence with "${word.word}"...`}
            value={sentence}
            onChange={e => setSentence(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mt-6">
          <button onClick={fetchWord} className="text-gray-400 text-sm px-4">Skip</button>
          <button onClick={submit} disabled={!sentence || loading} className="bg-[#1a3c3c] text-white px-8 py-2.5 rounded-full hover:opacity-90 disabled:opacity-50">
            {loading ? 'Checking...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}