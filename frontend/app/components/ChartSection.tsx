'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartProps {
    data: any[];
}

export default function ChartSection({ data }: ChartProps) {
    if (!data || data.length === 0) return null;

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis 
                        hide 
                        domain={[0, 10]} 
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#2F4F4F" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#2F4F4F', strokeWidth: 0 }}
                        activeDot={{ r: 7, strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}