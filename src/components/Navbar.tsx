import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AttendEase
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/attendance" className="text-foreground hover:text-primary transition-colors">
              Attendance
            </Link>
            <Link to="/reports" className="text-foreground hover:text-primary transition-colors">
              Reports
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors py-2">
              Home
            </Link>
            <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors py-2">
              Dashboard
            </Link>
            <Link to="/attendance" className="text-foreground hover:text-primary transition-colors py-2">
              Attendance
            </Link>
            <Link to="/reports" className="text-foreground hover:text-primary transition-colors py-2">
              Reports
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="ghost" className="w-full">Sign In</Button>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
