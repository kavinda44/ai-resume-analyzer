import React from 'react';
import { cn } from '~/lib/utils'; 

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClasses = '';
  let badgeText = '';

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
    
    <div className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wide border",
        badgeClasses
    )}>
      
     
      <div className={`size-2.5 rounded-full ${badgeClasses.split(' ')[1].replace('text', 'bg')}`} />

    
      <p className="text-white font-bold">
        {score}
        <span className="text-gray-400 font-medium">/100</span>
      </p>
      
     
      <p className="text-xs font-medium uppercase text-gray-400 ml-1">
        {badgeText}
      </p>
    </div>
  );
};

export default ScoreBadge;