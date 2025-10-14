import React from 'react'
import { cn } from '~/lib/utils'; // Assuming cn utility is available

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  
  // --- Score-based Styling Logic ---
  const scoreColor = score > 69
    ? 'text-green-400 border-green-500' // High score: Green
    : score > 49
      ? 'text-yellow-400 border-yellow-500' // Medium score: Yellow
      : 'text-red-400 border-red-500'; // Low score: Red

  const subtitle = score > 69
    ? 'Excellent ATS Compatibility!'
    : score > 49
      ? 'Moderate Compatibility'
      : 'Low Compatibility - Needs Attention';

  // --- Dynamic Icon/Feedback Colors ---
  const suggestionColors = {
    good: 'text-green-400',
    improve: 'text-red-400',
  };
    
  return (
    // Card Container: Dark background, shadow, and a subtle color-coded border on the left
    <div className={`bg-gray-900 rounded-xl shadow-2xl w-full p-6 border-l-4 ${scoreColor.split(' ')[1]}`}>
      
      {/* Top section with icon, headline, and score */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
        <div className="flex items-center gap-4">
          
          {/* Main Status Icon (Using Lucide-style SVG) */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 ${scoreColor.split(' ')[1]}`}>
             <svg className={`w-6 h-6 ${scoreColor.split(' ')[0]}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
             </svg>
          </div>
          
          <div>
            <h2 className="text-3xl font-extrabold text-white">
                ATS Score: <span className={scoreColor.split(' ')[0]}>{score}/100</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Description and Subtitle section */}
      <div className="mb-8">
        <h3 className={`text-xl font-bold mb-2 ${scoreColor.split(' ')[0]}`}>{subtitle}</h3>
        <p className="text-gray-400">
          This score represents how well your resume is structured and keyword-optimized to pass Applicant Tracking System (ATS) filters.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4 pt-6">
          {suggestions.map((suggestion, index) => {
            const isGood = suggestion.type === "good";
            const tipColor = isGood ? suggestionColors.good : suggestionColors.improve;

            return (
              <div 
                key={index} 
                className="flex items-start gap-4 p-3 rounded-lg bg-gray-800 border border-gray-700" // Elevated item
              >
                {/* Icon for Good/Improvement - FIXED: Wrapped multiple paths in a fragment */}
                <svg 
                    className={cn("w-5 h-5 mt-1 flex-shrink-0", tipColor)} 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    {isGood 
                        ? (
                            <>
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <path d="M9 11l3 3L22 4"/> 
                            </>
                        )
                        : (
                            <>
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                <path d="M12 9v4"/>
                                <path d="M12 17h.01"/>
                            </>
                        )
                    }
                </svg>
                
                {/* Tip Text */}
                <p className="text-gray-300">
                  <span className={cn("font-semibold mr-1", tipColor)}>
                    {isGood ? 'Strength:' : 'Improvement:'}
                  </span>
                  {suggestion.tip}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-500 italic pt-4 border-t border-gray-700 text-sm">
        Review these points carefully. Optimizing your resume for ATS filters is the first step toward securing an interview.
      </p>
    </div>
  );
}

export default ATS;
