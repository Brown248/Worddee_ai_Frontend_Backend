'use client';

import { DashboardStats } from '@/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Flame, Clock, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const API_BASE = '/python-api'; 

export default function MyProgressPage() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/summary`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a3c3c]"></div>
    </div>
  );

  if (!data) return <div className="text-center mt-20 text-gray-400">No data available. Start learning!</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
       <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1a3c3c]">Your learner dashboard</h1>
            <p className="text-gray-500 mt-1">Track your daily progress and consistency</p>
          </div>
          <Link href="/word-of-the-day" className="hidden md:flex items-center gap-2 text-[#7a9e9f] hover:text-[#1a3c3c] transition text-sm font-bold uppercase tracking-wider">
             New Challenge <ArrowRight className="w-4 h-4"/>
          </Link>
       </motion.div>

       <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl mb-8 flex items-center gap-4 shadow-sm border ${
            data.stats.missions_completed 
            ? 'bg-gradient-to-r from-[#ecfdf5] to-[#d1fae5] border-[#a7f3d0]' 
            : 'bg-white border-gray-100'
          }`}
       >
          <div className={`p-3 rounded-full ${data.stats.missions_completed ? 'bg-white text-green-600' : 'bg-gray-100 text-gray-400'}`}>
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-bold ${data.stats.missions_completed ? 'text-green-800' : 'text-gray-800'}`}>
                {data.stats.missions_completed ? "Mission Complete!" : "Keep going!"}
            </h3>
            <p className={`text-sm ${data.stats.missions_completed ? 'text-green-700' : 'text-gray-500'}`}>
                {data.stats.missions_completed 
                  ? "You've completed your daily writing goal." 
                  : "Complete at least one word challenge today to keep your streak."}
            </p>
          </div>
       </motion.div>

       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[24px] shadow-card border border-gray-100 p-8 md:p-10"
        >
            <h4 className="font-serif text-xl font-bold text-[#1a3c3c] mb-10">Learning Consistency</h4>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 mb-12 border-b border-gray-50 pb-10">
                <div className="text-center group">
                    <div className="flex items-center justify-center gap-3 text-5xl font-bold text-[#1a3c3c] mb-2 group-hover:scale-110 transition duration-300">
                        <Flame className={`${data.stats.day_streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-300'} w-10 h-10`} /> 
                        {data.stats.day_streak}
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Day streak</p>
                </div>
                
                <div className="hidden md:block w-px h-24 bg-gray-100"></div>
                
                <div className="text-center group">
                    <div className="flex items-center justify-center gap-3 text-5xl font-bold text-[#1a3c3c] mb-2 group-hover:scale-110 transition duration-300">
                        <Clock className="text-[#7a9e9f] w-10 h-10" /> 
                        <span>{data.stats.hours_learned}<span className="text-2xl text-gray-400 font-normal">h</span> {data.stats.minutes_learned}<span className="text-2xl text-gray-400 font-normal">m</span></span>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Total Time Learned</p>
                </div>
            </div>

            <div className="h-[350px] w-full">
                {data.chart_data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.chart_data}>
                            <defs>
                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7a9e9f" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#7a9e9f" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={15} />
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px 20px' }} formatter={(value: any) => [`${value}/10`, 'Score']} />
                            <Area type="monotone" dataKey="score" stroke="#1a3c3c" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        Start your first lesson to see the graph!
                    </div>
                )}
            </div>
         </motion.div>
    </div>
  );
}