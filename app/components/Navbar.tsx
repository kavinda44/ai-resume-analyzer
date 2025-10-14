import { Link } from "react-router"; // Using "react-router" as per your project's configuration

const Navbar = () => {
  return (
    // Applies the custom glass-effect class from app.css
    <nav className="glass-effect sticky top-0 z-20"> 
      
      {/* Inner Container: Centered content, max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* LOGO (LEFT SIDE) */}
        <Link to="/">
          <p className="text-3xl font-extrabold text-white tracking-tight">
            JobFit
          </p>
        </Link>

        {/* NAVIGATION LINKS & ACTION BUTTON (RIGHT SIDE CONTAINER) */}
        {/* We use flex items-center and space-x-6 to group the links and the button */}
        <div className="flex items-center space-x-6">
          
          {/* Navigation Links for Home, About, and Contact */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-300 hover:text-indigo-400 transition">
                Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-indigo-400 transition">
                About Us
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition">
                Contact Us
            </Link>
          </div>

          {/* ACTION BUTTON */}
          <Link 
            to="/upload" 
            className="bg-indigo-600 text-white font-semibold rounded-lg px-4 py-2 text-sm shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Analyze Resume
          </Link>
          
        </div>

      </div>
    </nav>
  )
}
export default Navbar
