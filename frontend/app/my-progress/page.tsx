'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Flame, Clock } from 'lucide-react';

// ✅ ใช้ทางลัด Proxy เหมือนหน้าแรก (เพื่อแก้ปัญหา CORS/Connection)
const API_BASE = '/python-api'; 

export default function MyProgressPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // เรียกผ่าน Proxy: /python-api/summary -> Backend
        const res = await axios.get(`${API_BASE}/summary`);
        setData(res.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError('ไม่สามารถดึงข้อมูลสถิติได้ (กรุณาเช็คว่า Backend เปิดอยู่หรือไม่)');
      }
    };
    fetchData();
  }, []);

  // กรณี Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-200">
          <h3 className="text-lg font-bold mb-2">⚠️ โหลดข้อมูลไม่ได้</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 text-sm"
          >
            ลองโหลดใหม่
          </button>
        </div>
      </div>
    );
  }

  // กรณี Loading
  if (!data) return <div className="text-center mt-20 text-gray-400 animate-pulse">Loading stats...</div>;

  return (
    <div className="max-w-5xl mx-auto py-6">
       <h1 className="text-3xl font-serif text-[#1a3c3c] mb-8">User's learner dashboard</h1>

       {/* ส่วน Mission */}
       <div className="mb-8">
         <h3 className="font-bold text-lg text-[#1a3c3c] mb-3">Your missions today</h3>
         <div className={`p-4 rounded-lg text-sm border ${data.stats.missions_completed ? 'bg-green-50 border-green-100 text-green-800' : 'bg-[#f0f2f5] border-gray-200 text-gray-600'}`}>
            {data.stats.missions_completed 
              ? "🎉 Well done! You've completed all your missions." 
              : "📌 You have pending missions to complete."}
         </div>
       </div>

       {/* ส่วน Overview & Chart */}
       <div>
         <h3 className="font-bold text-lg text-[#1a3c3c] mb-3">Overview</h3>
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h4 className="font-serif text-[#1a3c3c] mb-8">Learning consistency</h4>
            
            <div className="flex justify-center gap-20 border-b border-gray-100 pb-8 mb-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-gray-800 mb-1">
                        <Flame className="text-orange-500 fill-orange-500" /> {data.stats.day_streak}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Day streak</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-gray-800 mb-1">
                        <Clock className="text-blue-400" /> {data.stats.hours_learned}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Hours learned</p>
                </div>
            </div>

            {/* กราฟ Recharts */}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.chart_data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#ccc', fontSize: 12}} 
                            dy={10} 
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#1a3c3c" 
                            strokeWidth={3} 
                            dot={{fill:'#1a3c3c', r:4}} 
                            activeDot={{r: 6}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-8 flex justify-center">
                <button className="bg-[#1a3c3c] text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
                    Take the test
                </button>
            </div>
         </div>
       </div>
    </div>
  );
}