"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type JobNode = {
  title: string;
  gravity_score: number;
  orbit_label: string;
};

interface GravityOrbitProps {
  jobs: JobNode[];
}

export default function GravityOrbit({ jobs }: GravityOrbitProps) {
  const [hoveredJob, setHoveredJob] = useState<JobNode | null>(null);

  const getOrbitProps = (score: number, index: number) => {
    // Score 0 -> radius ~350px, Score 100 -> radius ~120px
    const radius = 350 - (score * 2.3); 
    // Score 0 -> duration ~60s, Score 100 -> duration ~20s
    const duration = 60 - (score * 0.4);
    const delay = -(index * 13.5);

    return { radius: Math.max(120, radius), duration, delay };
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-[#0a0a0a] overflow-hidden flex items-center justify-center rounded-3xl border border-gray-800/50 shadow-2xl">
      {/* Background Starfield/Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Center "YOU" Node */}
      <div className="absolute z-30 flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-black border-2 border-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] group cursor-pointer hover:scale-105 transition-transform duration-300">
        <span className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Center of</span>
        <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter">YOU</span>
      </div>

      {/* Orbits and Nodes */}
      {jobs.map((job, idx) => {
        const { radius, duration, delay } = getOrbitProps(job.gravity_score, idx);

        return (
          <div 
            key={idx}
            className="absolute top-1/2 left-1/2 rounded-full border border-gray-800/60 pointer-events-none"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              marginTop: `-${radius}px`,
              marginLeft: `-${radius}px`,
            }}
          >
            {/* The rotating container */}
            <motion.div 
              className="w-full h-full pointer-events-none absolute"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration, ease: "linear", delay }}
            >
              {/* The planet (job node) */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                onMouseEnter={() => setHoveredJob(job)}
                onMouseLeave={() => setHoveredJob(null)}
              >
                {/* Counter-rotate to keep planet upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration, ease: "linear", delay }}
                  className="w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] relative"
                >
                  <div className="absolute inset-0 rounded-full animate-ping bg-white opacity-40"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        );
      })}

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredJob && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 bg-[#111] border border-gray-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md min-w-[300px]"
          >
            <div className="flex flex-col gap-2 text-center">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{hoveredJob.orbit_label}</span>
              <span className="text-2xl font-bold text-white">{hoveredJob.title}</span>
              <div className="mt-2 flex justify-center items-center gap-2">
                <span className="text-sm text-gray-400">Gravity Score:</span>
                <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-bold">{hoveredJob.gravity_score}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
