import React from 'react';
import { cn } from '~/lib/utils'; // Assuming cn utility is available

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClasses = '';
  let badgeText = '';

  // --- Determine Colors and Text based on Score ---
  if (score > 70) {
    // Strong Match: Green
    badgeClasses = 'bg-green-900/40 text-green-400 border-green-700';
    badgeText = 'Strong Match';
  } else if (score > 49) {
    // Good Start: Yellow/Amber
    badgeClasses = 'bg-yellow-900/40 text-yellow-400 border-yellow-700';
    badgeText = 'Good Start';
  } else {
    // Needs Work: Red
    badgeClasses = 'bg-red-900/40 text-red-400 border-red-700';
    badgeText = 'Needs Work';
  }

  return (
    // Container: Dark translucent background with a color-coded border
    <div className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wide border",
        badgeClasses
    )}>
      
      {/* Visual Indicator (Using a simple dot for status) */}
      <div className={`size-2.5 rounded-full ${badgeClasses.split(' ')[1].replace('text', 'bg')}`} />

      {/* Numerical Score */}
      <p className="text-white font-bold">
        {score}
        <span className="text-gray-400 font-medium">/100</span>
      </p>
      
      {/* Status Text */}
      <p className="text-xs font-medium uppercase text-gray-400 ml-1">
        {badgeText}
      </p>
    </div>
  );
};

export default ScoreBadge;