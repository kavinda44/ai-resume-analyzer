import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar"; 
import ResumeCard from "~/components/ResumeCard"; 
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";


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

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth');
    }
  }, [auth.isAuthenticated, navigate]);

  const loadResumes = async () => {
    if (!kv) return;
    setLoadingResumes(true);
    const resumes = (await kv.list('resume:*', true)) as KVItem[];
    const parsedResumes = resumes?.map((resume) => (
      JSON.parse(resume.value) as Resume
    ));
    setResumes(parsedResumes || []);
    setLoadingResumes(false);
  }

  useEffect(() => {
    if (auth.isAuthenticated && kv) {
      loadResumes();
    }
  }, [auth.isAuthenticated, kv]);

  const svgBackground = (
    <svg className="absolute -z-10 w-screen -mt-40 md:mt-0" width="1440" height="676" viewBox="0 0 1440 676" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-92" y="-948" width="1624" height="1624" rx="812" fill="url(#a)"/>
      <defs>
        <radialGradient id="a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 428 292)scale(812)">
          <stop offset=".63" stopColor="#372AAC" stopOpacity="0"/> 
          <stop offset="1" stopColor="#372AAC"/>
        </radialGradient>
      </defs>
    </svg>
  );

  if (!auth.isAuthenticated) {
    return <div className="min-h-screen bg-gray-900" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white"> 
      
      {svgBackground}
      
      <Navbar /> 

      <section className="flex flex-col items-center pt-10 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 relative z-10">
        
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

        <div className="flex items-center gap-4 mt-8">
          <div className="relative inline-block p-0.5 rounded-full overflow-hidden transition duration-300 hover:scale-[1.05] active:scale-100 
                         before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#4F46E5,_#A78BFA,_#4F46E5)] animated-button-wrapper">
              <Link 
                to="/upload" 
                className="relative z-10 flex items-center gap-2 bg-gray-900 text-white font-semibold rounded-full px-8 h-12 text-lg transition duration-150 ease-in-out hover:bg-gray-800"
              >
                Analyze My Resume
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
          </div>
        </div>
      </section>

   
      <section className="py-20 bg-gray-900">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-white">How JobFit Transforms Your Application</h2>
          <p className="text-center text-slate-400 mt-2 max-w-lg mx-auto">
            Our AI-driven process gives you the competitive edge in three simple steps.
          </p>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            
            
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700">
                <div className="flex items-center justify-center size-12 bg-indigo-900/50 border border-indigo-500/50 rounded-lg">
                    <img src="../icons/upload.png" alt="Upload Icon" className="size-8" />
                </div>
                <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-semibold text-white">Instant Upload</h3>
                    <p className="text-sm text-slate-400">Provide any job description and upload your resume in PDF format to get started.</p>
                </div>
            </div>

           
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700">
                <div className="flex items-center justify-center size-12 bg-indigo-900/50 border border-indigo-500/50 rounded-lg">
                    <img src="../icons/ai.png" alt="AI Analysis Icon" className="size-8" />
                </div>
                <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-semibold text-white">AI-Powered Analysis</h3>
                    <p className="text-sm text-slate-400">Our engine evaluates your CV for keyword alignment, structure, and content quality.</p>
                </div>
            </div>

            
            <div className="p-8 bg-gray-800 rounded-xl border border-gray-700">
                <div className="flex items-center justify-center size-12 bg-indigo-900/50 border border-indigo-500/50 rounded-lg">
                    <img src="../icons/report.png" alt="Feedback Report Icon" className="size-8" />
                </div>
                <div className="mt-5 space-y-2">
                    <h3 className="text-lg font-semibold text-white">Actionable Feedback</h3>
                    <p className="text-sm text-slate-400">Receive an instant ATS score and a detailed report to refine your resume and boost your chances.</p>
                </div>
            </div>

          </div>
        </div>
      </section>
      
      {auth.isAuthenticated && (
        <section className="w-full max-w-7xl mx-auto px-8 pb-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Your Recent Analyses</h2>
          
          {loadingResumes ? (
            <div className="py-16 flex flex-col items-center justify-center bg-gray-800 rounded-xl shadow-lg">
                <img src="/images/resume-scan-2.gif" alt="Scanning Resumes" className="w-[120px] h-[120px] object-contain mb-4"/>
              <p className="text-lg font-medium text-indigo-400 animate-pulse">Loading dashboard data...</p>
            </div>
          ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          ) : (
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
          <p className="text-xs text-gray-500 mt-6 items-center text-center">
                        © 2025 Kavinda Dissanayake. All Rights Reserved. 
                    </p>
        </section>
      )}
    </div>
  );
}

