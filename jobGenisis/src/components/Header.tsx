
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  
  // Check if the current route is login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-md" : (isAuthPage ? "bg-transparent" : "bg-black/50")
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          className="text-2xl font-bold"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => navigate("/")}
        >
          <span className="text-gradient cursor-pointer">JobGenisis</span>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { path: "/", label: "Home" },
            { path: "/upload", label: "Upload Resume" },
            { path: "/interview", label: "Interview" },
            { path: "/about", label: "About Us" },
            { path: "/contact", label: "Contact" },
          ].map((item) => (
            <div key={item.path} className="relative">
              <Button
                variant="ghost"
                className={`text-base font-medium ${isActive(item.path) ? "text-accent" : "text-white"}`}
                onClick={() => navigate(item.path)}
                data-active={isActive(item.path)}
              >
                {item.label}
              </Button>
            </div>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:block text-white text-sm">
                <span>Hello, </span>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-white hover:bg-white/20"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && location.pathname !== "/signup" && (
                <>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="hidden sm:flex items-center gap-2 text-white hover:bg-white/20"
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>
                  <Button 
                    className="button-glow text-white"
                    onClick={() => navigate("/signup")}
                  >
                    <UserPlus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </>
              )}
              {(location.pathname === "/login" || location.pathname === "/signup") && (
                <Button 
                  className="button-glow text-white"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
