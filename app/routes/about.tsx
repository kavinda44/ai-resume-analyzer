import { Link } from "react-router";
import Navbar from "~/components/Navbar";


const IconCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

export const meta = () => ([
    { title: 'JobFit | Our Mission' },
    { name: 'description', content: 'Learn about the technology and mission behind JobFit.' },
]);

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
             
                <section className="text-center mb-20">
                   
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mt-2 mb-4">
                        About JobFit
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        JobFit was built to demystify the hiring process, providing data-driven insights to help you stand out.
                    </p>
                </section>

              <section className="mb-20 bg-gray-800 p-8 rounded-xl shadow-2xl border border-indigo-500/30">
                    <h2 className="text-3xl font-bold text-left text-white mb-6">What is JobFit?</h2>
                    <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                        <p>
                            JobFit is an AI-powered resume analyzer designed to bridge the gap between complex job descriptions and candidate qualifications. In today's competitive market, a generic resume is often overlooked. Our application uses advanced AI, powered by Claude, to instantly evaluate your CV against any job role, providing a detailed ATS (Applicant Tracking System) score and actionable feedback.
                        </p>
                        <p>
                            Our goal is to provide a powerful, transparent, and completely free tool that empowers you to refine your resume with confidence. Stop guessing what recruiters want get the data-driven insights you need to land your dream job.
                        </p>
                    </div>
                </section>

           
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center text-white mb-10">Our Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <IconCard 
                            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M12 12l-2-2m2 2l2 2m-2-2l-2 2m2-2l2-2" /></svg>}
                            title="AI-Powered Precision"
                            description="We use advanced AI, powered by Claude, to provide objective, data-driven analysis that goes beyond simple keyword matching."
                        />
                        <IconCard 
                            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            title="Actionable Feedback"
                            description="Our goal isn't just to score your resume, but to give you a clear action plan to improve it for any job you apply for."
                        />
                        <IconCard 
                            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                            title="Free & Accessible"
                            description="We believe powerful career tools should be available to everyone. JobFit is completely free to use."
                        />
                        <IconCard 
                            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                            title="Creator-Driven Vision"
                            description="As a developer passionate about AI and equitable hiring, this project was built to solve a real-world problem I've seen firsthand."
                        />
                    </div>
                </section>

                
                <section className="text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Stand Out?</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Stop guessing what recruiters want to see. Get your instant AI analysis now and take the next step in your career.
                    </p>
                    <Link 
                        to="/upload" 
                        className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg px-8 py-3 shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                        Analyze My Resume
                    </Link>
                    
                </section>
                
            </main>
        </div>
    );
};

export default About;

