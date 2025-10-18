import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - MunAiTech"
        description="The page you are looking for could not be found. Return to Kingsley Munachi's portfolio to explore AI-powered web solutions and full-stack development services."
      />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <Navbar />
        
        <div className="flex min-h-[80vh] items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            {/* 404 Animation */}
            <div className="mb-8 relative">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                404
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-cyan-400/20 blur-3xl -z-10"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
            <p className="text-xl text-gray-400 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:opacity-90">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.history.back()}
                className="border-cyan-500/30 text-white hover:bg-cyan-500/10"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-16 grid grid-cols-3 gap-4 text-sm text-gray-500">
              <Link to="/projects" className="hover:text-cyan-400 transition-colors">
                View Projects
              </Link>
              <Link to="/about" className="hover:text-cyan-400 transition-colors">
                About Me
              </Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
