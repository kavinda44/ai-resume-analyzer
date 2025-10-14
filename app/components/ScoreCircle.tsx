import React from 'react';

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // --- Dynamic Color Logic for the Dark Theme ---
  const getStrokeColor = (s: number) => {
    if (s >= 75) return '#48bb78'; // Tailwind Green-500
    if (s >= 50) return '#f6e05e'; // Tailwind Yellow-400
    return '#f87171'; // Tailwind Red-500
  };

  const strokeColor = getStrokeColor(score);

  return (
    <div className="relative w-[100px] h-[100px] bg-gray-800 rounded-full shadow-lg">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle (Darker gray for contrast) */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#374151" // Tailwind Gray-700
          strokeWidth={stroke}
          fill="transparent"
        />
        
        {/* Partial circle with dynamic status color */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={strokeColor} // Dynamic color based on score
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // Added transition for a smooth visual effect if the score changes
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.3s' }}
        />
      </svg>

      {/* Score Text (High-contrast white) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-extrabold text-xl text-white">{score}</span>
        <span className="font-medium text-sm text-gray-400">/100</span>
      </div>
    </div>
  );
};

export default ScoreCircle;
