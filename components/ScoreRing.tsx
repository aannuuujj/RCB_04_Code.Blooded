import React from "react";

type ScoreRingProps = {
  score: number;
  label: string;
};

export default function ScoreRing({ score, label }: ScoreRingProps) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-32 h-32">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            stroke="#333"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Score Ring */}
          <circle
            stroke="#fff"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-bold text-brand-white">
          {score}
        </span>
      </div>
      <span className="mt-2 text-sm text-brand-gray font-semibold tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}
