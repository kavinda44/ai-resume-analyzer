import { Link } from "react-router"; 
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";


const getScoreColor = (score: number) => {
  if (score >= 75) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};



const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState('');

 
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if(!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    }
    loadResume();
  }, [imagePath]);

  const score = feedback.overallScore;
  const scoreColorClass = getScoreColor(score);

  return (
   
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
      
     
      <div className="flex flex-col gap-2 pb-2 border-b border-gray-700">
        
      
        <div className="flex justify-between items-start gap-4">
          
        
          <div className="flex flex-col gap-1.5 flex-grow">
            {companyName && (
              <h2 className="text-xl font-bold text-white break-words">
                {companyName}
              </h2>
            )}
            {jobTitle && (
              <h3 className="text-base break-words text-indigo-400">
                {jobTitle}
              </h3>
            )}
            {!companyName && !jobTitle && (
              <h2 className="text-xl font-bold text-white">General Resume Analysis</h2>
            )}
          </div>
          
         
          <div className="flex-shrink-0 text-right">
            <span className="text-3xl font-extrabold text-white leading-none">{score}</span>
            <span className="text-xs text-gray-400 block mt-0.5">/100</span>
          </div>

        </div>

       
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
                className={`h-full rounded-full transition-all duration-700 ease-out ${scoreColorClass}`} 
                style={{ width: `${score}%` }} 
            />
        </div>

      </div>
      
      
      {resumeUrl && (
        <div className="p-1.5 rounded-xl border border-gray-700 bg-gray-900 shadow-inner overflow-hidden">
          <div className="w-full h-full">
            <img
              src={resumeUrl}
              alt={`Preview of ${companyName || 'Resume'}`}
              className="w-full h-[300px] object-cover object-top rounded-lg opacity-90 transition hover:opacity-100"
            />
          </div>
        </div>
      )}

      
      <div className="flex justify-between items-center pt-2 text-sm text-gray-400">
          <p>Click to view detailed AI feedback</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
      </div>

    </Link>
  )
}

export default ResumeCard