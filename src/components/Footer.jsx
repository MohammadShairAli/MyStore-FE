import { Link } from "lucide-react";
import { Outlet } from "react-router-dom";
export default function Footer() {


  return (
    <>
    <Outlet/>
    <footer className="bg-slate-800 text-slate-300 py-6 mt-10 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        {/* Left side */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>

        

        {/* Right side */}
        <p className="text-center md:text-right text-slate-400">
          Built with ❤️ using React + Django
        </p>
      </div>
    </footer>
    </>
  );
}
