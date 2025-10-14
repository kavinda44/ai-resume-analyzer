import React, { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  // --- Dynamic Color Logic for the Dark Theme ---
  const getStopColors = (s: number) => {
    if (s >= 75) return ['#34D399', '#10B981']; // Green (High Score)
    if (s >= 50) return ['#FBBF24', '#F59E0B']; // Yellow/Amber (Medium Score)
    return ['#F87171', '#EF4444']; // Red (Low Score)
  };

  const [startColor, endColor] = getStopColors(score);

  useEffect(() => {
    // Calculate the path length once the component mounts to set up the dash array/offset
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Calculate the stroke offset for the animation
  const strokeDashoffset = pathLength * (1 - percentage);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 rounded-xl shadow-lg">
      <div className="relative w-full max-w-[160px] h-[80px]">
        <svg viewBox="0 0 100 50" className="w-full h-full -translate-y-1">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>

          {/* Background arc (Darker gray for contrast) */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#374151" // Tailwind Gray-700
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc with dynamic color and animation */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            // Added transition for a smooth filling effect
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>

        {/* Score Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="text-3xl font-extrabold text-white leading-none">{score}</span>
            <span className="text-sm font-medium text-gray-400 mt-1">/100 MATCH</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
