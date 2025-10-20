import { useState, type FormEvent } from "react";
import Navbar from "~/components/Navbar";

export const meta = () => ([
  { title: 'JobFit | Contact Us' },
  { name: 'description', content: 'Get in touch with the JobFit support team.' },
]);

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission success since we don't have a live backend endpoint
    setIsSubmitted(true);
    // In a real app, you would fetch(endpoint, { method: 'POST', body: data }) here
    setTimeout(() => {
        // Reset after 5 seconds
        setIsSubmitted(false);
        e.currentTarget.reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400">
            We're here to help you with any questions about the AI analysis, features, or support.
          </p>
        </div>

        {/* Contact Form Card */}
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
          
          {/* Success Message */}
          {isSubmitted && (
            <div className="p-4 rounded-lg bg-green-900/40 text-green-400 border border-green-700">
                <p className="font-semibold">Thank you! Your message has been sent successfully.</p>
                <p className="text-sm">We'll get back to you as soon as possible.</p>
            </div>
          )}

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="text-sm font-medium text-white block mb-2">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="text-sm font-medium text-white block mb-2">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="text-sm font-medium text-white block mb-2">Your Message</label>
            <textarea rows={6} id="message" name="message" placeholder="How can we assist you?" required />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-indigo-500 cursor-pointer text-white font-semibold rounded-lg px-6 py-3 shadow-lg hover:bg-indigo-600 transition duration-150 ease-in-out"
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
