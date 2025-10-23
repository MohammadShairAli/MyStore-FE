import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);       // for profile dropdown
  // const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // reference to the dropdown
  const token = localStorage.getItem("token");
  // Close dropdown when clicking outside

  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 

  return (
    <>
      <nav className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
        {/* Left side - brand */}
        <Link to='/'>
          <h1 className="text-xl font-bold tracking-wide">MyStore</h1>
        </Link>

        {/* Right side - links */}
        <div className="flex items-center space-x-6">
          {!token && <Link
            to="/signin"
            className="hover:text-slate-300 transition-colors duration-200"
          >
            Sign In
          </Link>}
          {!token && <Link
            to="/signup"
            className="hover:text-slate-300 transition-colors duration-200"
          >
            Sign Up
          </Link>
          }
          {<Link
            to={token?"/post":"/signin"}
            className="hover:text-slate-400 transition-colors duration-200"
          >
            POST
          </Link>
          }
          
          {token && <Link
            to="/signin"
            onClick={handleLogout}
            className="hover:text-red-400 transition-colors duration-200"
          >
            Logout
          </Link>
          }
          {/* Profile Icon */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-slate-700 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-slate-800 rounded-lg shadow-lg py-2">
                {token && <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-slate-100 transition"
                >
                  Profile
                </Link>}
                {token && <Link
                  to="/MyUploads"
                  className="block px-4 py-2 hover:bg-slate-100 transition"
                >
                  My Posts
                </Link>}
                {!token && <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-slate-100 transition"
                  
                >
                  SignUp
                </Link>}
                {!token && <Link
                  to="/signin"
                  className="block px-4 py-2 hover:bg-slate-100 transition"
                >
                  Login
                </Link>}
                {token && <Link
                  to="/signin"
                  className="block px-4 py-2 hover:bg-slate-100 transition"
                  onClick={handleLogout}
                >
                  Logout
                </Link>}
                
              </div>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
      
    </>
  );
}
