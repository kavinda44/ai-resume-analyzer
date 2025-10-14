import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// Assuming 'Resumind' is the old project name, let's update it to 'JobFit'
export const meta = () => ([
  { title: 'JobFit | Authentication' },
  { name: 'description', content: 'Log into your AI-powered job application dashboard' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  
  // NOTE: A more robust way to parse the 'next' parameter:
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get('next') || '/'; // Default to homepage
  
  const navigate = useNavigate();

  // Redirect authenticated users
  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  // Styling for the main button, consistent with the indigo primary color
  const baseButtonClasses = "w-full text-center text-xl font-semibold rounded-lg py-4 transition duration-200 ease-in-out";
  const loginButtonClasses = `${baseButtonClasses} bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg`;
  const logoutButtonClasses = `${baseButtonClasses} bg-red-600 hover:bg-red-700 text-white shadow-lg`;
  const loadingButtonClasses = `${baseButtonClasses} bg-gray-600 text-gray-300 animate-pulse cursor-not-allowed`;

  return (
    // Dark background for the whole page, centered content
    <div className="min-h-screen flex items-center justify-center bg-gray-900"> 
      
      {/* Login Card/Modal: Dark elevated background, subtle border */}
      <section className="bg-gray-800 rounded-xl shadow-2xl p-10 max-w-sm w-full border border-gray-700">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            Welcome to JobFit
          </h1>
          <h2 className="text-lg text-gray-400">
            Log in to continue your AI-powered analysis.
          </h2>
        </div>
        
        {/* Authentication Button Area */}
        <div className="mt-8">
          {isLoading ? (
            <button className={loadingButtonClasses} disabled>
              <p>Signing you in...</p>
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                // Sign Out Button (Styled in red for clear action)
                <button className={logoutButtonClasses} onClick={auth.signOut}>
                  <p>Log Out</p>
                </button>
              ) : (
                // Sign In Button (Styled in primary indigo color)
                <button className={loginButtonClasses} onClick={auth.signIn}>
                  <p>Log In to Dashboard</p>
                </button>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Auth