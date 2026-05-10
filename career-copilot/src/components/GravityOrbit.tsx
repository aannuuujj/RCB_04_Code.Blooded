"use client";
import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

interface Job {
  title: string;
  gravity_score: number;
  orbit_label: string;
}

interface Props {
  jobs: Job[];
}

function getOrbitRadius(score: number): number {
  if (score >= 80) return 90;
  if (score >= 60) return 150;
  if (score >= 40) return 210;
  return 270;
}

function getOrbitOpacity(score: number): number {
  if (score >= 80) return 1;
  if (score >= 60) return 0.85;
  if (score >= 40) return 0.65;
  return 0.4;
}

function getOrbitColor(score: number): string {
  if (score >= 80) return "#ffffff";
  if (score >= 60) return "#cccccc";
  if (score >= 40) return "#888888";
  return "#444444";
}

function getOrbitSpeed(index: number): number {
  const speeds = [18, 25, 32, 42];
  return speeds[index % speeds.length];
}

function OrbitingJob({
  job,
  index,
  cx,
  cy,
}: {
  job: Job;
  index: number;
  cx: number;
  cy: number;
}) {
  const radius = getOrbitRadius(job.gravity_score);
  const opacity = getOrbitOpacity(job.gravity_score);
  const color = getOrbitColor(job.gravity_score);
  const speed = getOrbitSpeed(index);
  const [hovering, setHovering] = useState(false);
  const angleRef = useRef((index * Math.PI) / 2);
  const [pos, setPos] = useState({
    x: cx + radius * Math.cos(angleRef.current),
    y: cy + radius * Math.sin(angleRef.current),
  });

  useAnimationFrame((_, delta) => {
    if (!hovering) {
      angleRef.current += (delta / 1000) * (Math.PI * 2) / speed;
    }
    setPos({
      x: cx + radius * Math.cos(angleRef.current),
      y: cy + radius * Math.sin(angleRef.current),
    });
  });

  return (
    <g
      style={{ opacity }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="cursor-pointer"
    >
      {/* Orbit ring (static dashed circle) */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="4 6"
        opacity={0.25}
      />

      {/* Glow */}
      {hovering && (
        <circle cx={pos.x} cy={pos.y} r={20} fill={color} opacity={0.12} />
      )}

      {/* Job circle */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={12}
        fill={color}
        stroke={hovering ? "#fff" : "transparent"}
        strokeWidth="1.5"
      />

      {/* Job label */}
      <text
        x={pos.x}
        y={pos.y + 24}
        textAnchor="middle"
        fontSize="9"
        fill={color}
        fontFamily="Inter, sans-serif"
        fontWeight="500"
      >
        {job.title.length > 14 ? job.title.slice(0, 12) + "…" : job.title}
      </text>

      {/* Tooltip */}
      {hovering && (
        <g>
          <rect
            x={pos.x - 70}
            y={pos.y - 72}
            width={140}
            height={58}
            rx={6}
            fill="#111"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1"
          />
          <text x={pos.x} y={pos.y - 52} textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600" fontFamily="Inter, sans-serif">
            {job.title}
          </text>
          <text x={pos.x} y={pos.y - 36} textAnchor="middle" fontSize="9" fill="#aaa" fontFamily="Inter, sans-serif">
            Score: {job.gravity_score}
          </text>
          <text x={pos.x} y={pos.y - 22} textAnchor="middle" fontSize="9" fill="#888" fontFamily="Inter, sans-serif">
            {job.orbit_label}
          </text>
        </g>
      )}
    </g>
  );
}

export default function GravityOrbit({ jobs }: Props) {
  const W = 600;
  const H = 500;
  const cx = W / 2;
  const cy = H / 2;

  return (
    <div className="w-full bg-black rounded-2xl border border-white/8 overflow-hidden">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: 500 }}
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={60} fill="url(#centerGlow)" />

        {/* Orbit rings background */}
        {[90, 150, 210, 270].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Orbiting jobs */}
        {jobs.map((job, i) => (
          <OrbitingJob key={i} job={job} index={i} cx={cx} cy={cy} />
        ))}

        {/* Center planet */}
        <circle cx={cx} cy={cy} r={28} fill="white" />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize="10"
          fill="black"
          fontWeight="700"
          fontFamily="Inter, sans-serif"
          letterSpacing="1"
        >
          YOU
        </text>
      </svg>
    </div>
  );
}
