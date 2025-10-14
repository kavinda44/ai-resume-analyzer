import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar"; 
import ResumeCard from "~/components/ResumeCard"; 
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Assuming Resume and KVItem types are defined elsewhere

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JobFit - AI Application Analyzer" },
    { name: "description", content: "Analyze your resumes with AI and match them to job requirements." },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  // AUTHENTICATION CHECK
  useEffect(() => {
    // If the user is NOT logged in, we let them see the public landing page section.
    if (!auth.isAuthenticated) {
      // Logic for public access or redirect...
    } else {
      loadResumes();
    }
  }, [auth.isAuthenticated])

  const loadResumes = async () => {
    setLoadingResumes(true);
    // Your Puter.js data fetching logic
    const resumes = (await kv.list('resume:*', true)) as KVItem[];
    const parsedResumes = resumes?.map((resume) => (
      JSON.parse(resume.value) as Resume
    ));

    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  }

  // --- RENDERING STARTS HERE ---

  const svgBackground = (
    <svg className="absolute -z-10 w-screen -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)"/>
      <defs>
        <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
          {/* Using a custom dark blue (#372AAC) for the background gradient */}
          <stop offset=".63" stop-color="#372AAC" stop-opacity="0"/> 
          <stop offset="1" stop-color="#372AAC"/>
        </radialGradient>
      </defs>
    </svg>
  );

  return (
    // Set min-h-screen and the overall dark background context
    <div className="min-h-screen bg-gray-900 text-white"> 
      
      {svgBackground}
      
      <Navbar /> {/* Use your Navbar component, styled for the dark theme */}

      {/* Main Content Section */}
      <section className="flex flex-col items-center pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
        {/* HERO SECTION - Landing Page Content */}
        <div className="flex items-center mt-20 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
          <div className="size-2.5 bg-green-500 rounded-full"></div>
          <span>AI-Powered Recruitment Tool</span>
        </div>
        
        <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-4xl">
          Intelligent Resume Matching for Your Job Listings
        </h1>
        
        <p className="text-center text-lg max-w-lg mt-4 text-slate-300">
          Instantly evaluate candidates with AI-driven ATS scoring and precise, automated job-to-resume matching.
        </p>

        {/* Action Buttons: Use your react-router Links */}
        <div className="flex items-center gap-4 mt-8">
          
          {/* 1. ANIMATED BUTTON WRAPPER - UPDATED to use rounded-full and p-0.5 */}
          <div className="relative inline-block p-0.5 rounded-full overflow-hidden transition duration-300 hover:scale-[1.05] active:scale-100 
                        before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)] animated-button-wrapper">
              
              {/* 2. INNER LINK/BUTTON - UPDATED to use rounded-full and bg-gray-800 */}
              <Link 
                to="/upload" 
                className="relative z-10 flex items-center gap-2 bg-gray-800 text-white font-semibold rounded-full px-8 h-12 text-lg transition duration-150 ease-in-out hover:bg-gray-700"
              >
                Upload Resume
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
          </div>
          
        </div>

        {/* Conditional Dashboard/Results View (The 'Showcase' Image spot) */}
        {auth.isAuthenticated && (
          <div className="w-full max-w-7xl mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Recent Analyses</h2>
            
            {loadingResumes ? (
              <div className="py-16 flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg">
                 <img src="/images/resume-scan-2.gif" alt="Scanning Resumes" className="w-[120px] h-[120px] object-contain mb-4"/>
                <p className="text-lg font-medium text-indigo-400 animate-pulse">Loading dashboard data...</p>
              </div>
            ) : resumes.length > 0 ? (
              // Resume List (The dashboard part)
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            ) : (
              // Empty State for Logged-In User
              <div className="py-16 text-center border-2 border-dashed border-gray-700 rounded-xl bg-gray-800 shadow-lg">
                <p className="mt-1 text-lg text-slate-400">
                  You are logged in! Upload your first resume to see instant AI feedback.
                </p>
                <div className="mt-6">
                  <Link 
                    to="/upload" 
                    className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700" 
                  >
                    Start New Analysis
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
