import { Link } from "react-router";
import Navbar from "~/components/Navbar";

export const meta = () => ([
  { title: 'JobFit | About Us' },
  { name: 'description', content: 'Learn about the technology and mission behind JobFit.' },
]);

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Our Mission: Smarter Hiring
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            JobFit is dedicated to bringing clarity and precision to the job application process for both candidates and recruiters.
          </p>
        </div>

        {/* Content Card 1: What We Do (Focus on the Problem/Solution) */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8 mb-10 border border-indigo-500/30">
          <h2 className="text-3xl font-bold text-indigo-400">
            What is JobFit?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            JobFit is an AI-powered resume analyzer designed to mimic the screening capabilities of modern Applicant Tracking Systems (ATS) and human reviewers. We provide a bridge between complex job descriptions and candidate resumes. Our analysis engine doesn't just count keywords; it uses intelligent semantic matching to evaluate relevance, tone, structure, and overall content quality.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            For job seekers, this means instant, actionable feedback to optimize their CVs before submitting. For recruiters, it means a fast, fair, and unbiased method for identifying top talent based on true job fit.
          </p>
        </div>

        {/* Content Card 2: Transparency & Vision */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white">
                Our Commitment to Transparency
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
                We believe you deserve more than just a pass/fail grade. JobFit provides a detailed score breakdown across multiple categories such as Content Relevance, Tone & Style, and Structure along with specific suggestions for improvement. Our commitment is to offer full transparency in the evaluation process, giving you the power to confidently refine your resume.
            </p>
            <Link to="/upload" className="inline-flex items-center text-indigo-400 font-semibold hover:text-indigo-300 transition">
                Ready to optimize your job application? Analyze your resume now 
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
        </div>
        
      </main>
    </div>
  );
};

export default About;
