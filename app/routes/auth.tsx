import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";


export const meta = () => ([
  { title: 'JobFit | Authentication' },
  { name: 'description', content: 'Log into your AI-powered job application dashboard' },
]);

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  
  
  const searchParams = new URLSearchParams(location.search);
  const next = searchParams.get('next') || '/'; 
  
  const navigate = useNavigate();

 
  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next, navigate]);

  
  const baseButtonClasses = "w-full text-center text-xl font-semibold rounded-lg py-4 transition duration-200 ease-in-out";
  const loginButtonClasses = `${baseButtonClasses} bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg`;
  const logoutButtonClasses = `${baseButtonClasses} bg-red-600 hover:bg-red-700 text-white shadow-lg`;
  const loadingButtonClasses = `${baseButtonClasses} bg-gray-600 text-gray-300 animate-pulse cursor-not-allowed`;

  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gray-900"> 
      
     
      <section className="bg-gray-800 rounded-xl shadow-2xl p-10 max-w-sm w-full border border-gray-700">
        
       
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            Welcome to JobFit
          </h1>
          <h2 className="text-lg text-gray-400">
            Log in to continue your AI-powered analysis.
          </h2>
        </div>
        
        
        <div className="mt-8">
          {isLoading ? (
            <button className={loadingButtonClasses} disabled>
              <p>Signing you in...</p>
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                
                <button className={logoutButtonClasses} onClick={auth.signOut}>
                  <p>Log Out</p>
                </button>
              ) : (
               
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