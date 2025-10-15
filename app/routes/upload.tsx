import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Ensure user is authenticated before allowing upload (Good practice)
    if (!auth.isAuthenticated && !isLoading) {
        navigate('/auth?next=/upload');
        return null;
    }

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    // AI Analysis Logic (Remains unchanged as it's functional)
    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    // Form Submission Logic (Remains unchanged)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) {
            // Provide visual feedback if file is missing
            alert('Please upload your PDF resume before analyzing.');
            return;
        }

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        // Removed the bg-[url] and now rely on the global dark background
        <div className="min-h-screen"> 
            <Navbar />

            {/* Centered Content Container */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* HEADING SECTION: Clean and centered */}
                <div className="text-center mb-10 space-y-4">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Smart Feedback for Your Dream Job
                    </h1>
                    <p className="text-xl text-gray-400">
                        Input the job details and upload your CV for an instant AI match score and improvement tips.
                    </p>
                </div>

                {/* PROCESSING STATE (Loading Animation) */}
                {isProcessing ? (
                    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center space-y-6 border border-indigo-500/50">
                        <h2 className="text-2xl font-semibold text-indigo-400 animate-pulse">{statusText}</h2>
                        {/* You can replace this with a modern spinner/icon if desired */}
                        <img src="/images/resume-scan.gif" alt="Scanning Resume" className="w-full max-w-xs rounded-lg" />
                        <p className="text-sm text-gray-500">
                            Analyzing large documents can take a moment. Please wait.
                        </p>
                    </div>
                ) : (
                    /* UPLOAD FORM (Clean dark-mode card) */
                    <form id="upload-form" onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-2xl space-y-8">
                        
                        {/* Input Fields */}
                        <div className="space-y-6">
                            {/* Company Name */}
                            <div className="form-group">
                                <label htmlFor="company-name" className="text-sm font-medium text-white block mb-2">Company Name</label>
                                <input 
                                    type="text" 
                                    name="company-name" 
                                    placeholder="e.g., Google, Facebook, Amazon" 
                                    id="company-name" 
                                    className="w-full" // Styles inherited from app.css
                                    required
                                />
                            </div>
                            
                            {/* Job Title */}
                            <div className="form-group">
                                <label htmlFor="job-title" className="text-sm font-medium text-white block mb-2">Job Title</label>
                                <input 
                                    type="text" 
                                    name="job-title" 
                                    placeholder="e.g., Software Engineer, Data Scientist" 
                                    id="job-title" 
                                    className="w-full"
                                    required
                                />
                            </div>
                            
                            {/* Job Description */}
                            <div className="form-group">
                                <label htmlFor="job-description" className="text-sm font-medium text-white block mb-2">Job Description</label>
                                <textarea 
                                    rows={8} // Increased rows for better usability
                                    name="job-description" 
                                    placeholder="Paste the full job description here..." 
                                    id="job-description" 
                                    className="w-full resize-none" // Added resize-none
                                    required
                                />
                            </div>
                        </div>

                        {/* File Uploader */}
                        <div className="form-group pt-4 border-t border-gray-700">
                            <label htmlFor="uploader" className="text-sm font-medium text-white block mb-2">Upload Resume (PDF only)</label>
                            <FileUploader onFileSelect={handleFileSelect} />
                        </div>

                        {/* Submit Button */}
                        <button 
                            className="w-full bg-[#00F5FF90] text-white font-semibold rounded-lg px-6 py-3 shadow-lg hover:bg-[#00BFFF] transition duration-150 ease-in-out disabled:opacity-50 cursor-pointer pointer-events-auto"
                            type="submit"
                            disabled={!file} // Disable if no file is selected
                        >
                            {file ? 'Analyze Resume' : 'Select File to Analyze'}
                        </button>
                    </form>
                )}
            </section>
        </div>
    )
}
export default Upload