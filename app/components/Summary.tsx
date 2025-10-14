import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import React from "react";

// Assuming Feedback type is available globally

// --- Sub-component: Category Breakdown ---
const Category = ({ title, score }: { title: string, score: number }) => {
  // Use high-contrast dark theme colors
  const textColor = score > 70 ? 'text-green-400'
    : score > 49
      ? 'text-yellow-400' : 'text-red-400';

  return (
    // Replaced legacy classes with clean dark-mode styles
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-200">
      
      {/* Category Title and Badge */}
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold text-white">{title}</p>
        <ScoreBadge score={score} />
      </div>
      
      {/* Category Score (Numerical) */}
      <p className="text-xl font-extrabold">
        <span className={textColor}>{score}</span>
        <span className="text-gray-500 font-normal">/100</span>
      </p>
    </div>
  )
}

// --- Main Component: Summary ---
const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    // Main Card Container: Dark, elevated, contrasting the page background
    <div className="bg-gray-900 rounded-xl shadow-2xl w-full p-6 border border-gray-700">
      
      {/* Top Section: Gauge and Text Intro */}
      <div className="flex items-center gap-6 p-4 border-b border-gray-700 mb-6">
        
        {/* Overall Score Visualization */}
        <div className="flex-shrink-0">
            <ScoreGauge score={feedback.overallScore} />
        </div>

        {/* Text Summary */}
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-white">Overall Resume Match Score</h2>
          <p className="text-sm text-gray-400">
            This score indicates the predicted effectiveness of your resume against the job description. Review the detailed categories below.
          </p>
        </div>
      </div>

      {/* Breakdown Categories List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-indigo-400 mb-2 px-2">Score Breakdown</h3>
        
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content Relevance" score={feedback.content.score} />
        <Category title="Structure & Formatting" score={feedback.structure.score} />
        <Category title="Keywords & Skills Match" score={feedback.skills.score} />
      </div>
    </div>
  )
}

export default Summary;
