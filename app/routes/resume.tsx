import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Recommendations from "~/components/Recommendations";

// Assuming Feedback type is globally available

export const meta = () => ([
  { title: 'JobFit | Resume Review' },
  { name: 'description', content: 'Detailed AI-powered review and score for your resume' },
]);

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading, auth.isAuthenticated, id, navigate]);

  // Data Loading Logic (unchanged)
  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    }

    loadResume();
  }, [id, fs, kv]);

  const LoadingState = (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-gray-800 rounded-xl shadow-inner">
      <img src="/images/resume-scan-2.gif" alt="Scanning Resume" className="w-[120px] h-[120px] object-contain" />
      <p className="text-lg font-medium text-indigo-400 animate-pulse">Loading AI analysis...</p>
    </div>
  );

  return (
    // Use min-h-screen to ensure the page container is tall enough
    <div className="min-h-screen bg-gray-900 text-white"> 
      
      {/* 1. Header/Navigation Bar (using the Glassmorphism class) */}
      <nav className="glass-effect sticky top-0 z-30 py-4 px-6 max-w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition">
            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="text-white text-base font-semibold">Back to Dashboard</span>
          </Link>
          {/* Optional: Add Job Title / Company Name here if available in the 'data' state */}
          <a 
            href={resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150"
          >
            View Full PDF
          </a>
        </div>
      </nav>

      {/* 2. Main Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-64px)] w-full max-lg:flex-col-reverse">
        
        {/* === LEFT COLUMN: RESUME PREVIEW (Sticky and Narrower: 5/12 width) === */}
        <section 
          className="lg:col-span-5 p-8 lg:sticky lg:top-16 min-h-[50vh] lg:h-[calc(100vh-64px)] bg-gray-900 flex flex-col items-center justify-start border-r border-gray-800"
        >
          <h2 className="text-xl font-bold text-gray-400 mb-6">Resume Preview (PDF Snapshot)</h2>
          {imageUrl && resumeUrl ? (
            <div className="w-full max-w-md h-full p-4 rounded-xl bg-gray-800 shadow-2xl overflow-y-auto">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="Resume Preview"
                  className="w-full h-auto object-contain transition duration-300 hover:opacity-90 cursor-pointer"
                  title="Click to open full PDF"
                />
              </a>
            </div>
          ) : (
            LoadingState
          )}
        </section>
        
        {/* === RIGHT COLUMN: AI FEEDBACK (Scrollable and Wider: 7/12 width) === */}
        <section className="lg:col-span-7 p-8 bg-gray-800">
          <h2 className="text-4xl font-bold text-white mb-8 border-b pb-4 border-gray-700">
            AI Analysis Report
          </h2>
          
          {feedback ? (
            <div className="flex flex-col gap-12 animate-in fade-in duration-1000">
              
              {/* 1. TOP-LEVEL RECOMMENDATIONS (Action Plan) */}
              

              {/* 2. Overall Summary and Score Breakdown */}
              <Summary feedback={feedback} />

              {/* 3. ATS Deep Dive */}
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              
              {/* 4. Detailed Category Breakdown */}
              <Details feedback={feedback} />

              <Recommendations feedback={feedback} /> 
            </div>
          ) : (
            LoadingState
          )}
        </section>
        
      </div>
    </div>
  );
}
export default Resume