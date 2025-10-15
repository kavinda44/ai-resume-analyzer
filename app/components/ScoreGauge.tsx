import React, { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  
  const getStopColors = (s: number) => {
    if (s >= 75) return ['#34D399', '#10B981']; 
    if (s >= 50) return ['#FBBF24', '#F59E0B']; 
    return ['#F87171', '#EF4444']; 
  };

  const [startColor, endColor] = getStopColors(score);

  useEffect(() => {
    
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

 
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

          
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#374151" 
            strokeWidth="10"
            strokeLinecap="round"
          />

          
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashoffset}
            
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>

       
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="text-3xl font-extrabold text-white leading-none">{score}</span>
            <span className="text-sm font-medium text-gray-400 mt-1">/100 MATCH</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
