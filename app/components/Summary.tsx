import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import React from "react";




const Category = ({ title, score }: { title: string, score: number }) => {
 
  const textColor = score > 70 ? 'text-green-400'
    : score > 49
      ? 'text-yellow-400' : 'text-red-400';

  return (
    
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-200">
      
     
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold text-white">{title}</p>
        <ScoreBadge score={score} />
      </div>
      
      
     
    </div>
  )
}


const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
   
    <div className="bg-gray-900 rounded-xl shadow-2xl w-full p-6 border border-gray-700">
      
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 p-4 border-b border-gray-700 mb-6">
        
       
        <div className="flex-shrink-0 mb-4 lg:mb-0">
            <ScoreGauge score={feedback.overallScore} />
        </div>

       
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-white">Overall Resume Match Score</h2>
          <p className="text-sm text-gray-400">
            This score indicates the predicted effectiveness of your resume against the job description. Review the detailed categories below.
          </p>
        </div>
      </div>

    
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