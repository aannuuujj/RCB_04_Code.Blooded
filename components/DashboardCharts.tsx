"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function ResumeLineChart({ data }: { data: any[] }) {
  const formattedData = data.map(d => ({
    name: new Date(d.created_at).toLocaleDateString(),
    score: d.overall_score || 0
  }));

  if (formattedData.length === 0) {
      return <div className="text-brand-gray text-center pt-24">No resume data available. Upload one to see trends!</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formattedData}>
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" domain={[0, 100]} />
        <Tooltip contentStyle={{ backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: '1px solid #333' }} />
        <Line type="monotone" dataKey="score" stroke="#fff" strokeWidth={3} dot={{ fill: '#fff', r: 4 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InterviewBarChart({ data }: { data: any[] }) {
  const formattedData = data.map((d, i) => ({
    name: `S${i + 1}`,
    score: d.session_score || 0
  }));

  if (formattedData.length === 0) {
      return <div className="text-brand-gray text-center pt-24">No interview data available. Complete a session!</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formattedData}>
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" domain={[0, 10]} />
        <Tooltip contentStyle={{ backgroundColor: '#111', color: '#fff', borderRadius: '8px', border: '1px solid #333' }} />
        <Bar dataKey="score" fill="#fff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
