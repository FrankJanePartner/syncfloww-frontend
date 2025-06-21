import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Settings, User, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  isAuthenticated?: boolean;
  showSearch?: boolean;
}

const Header = ({ onLoginClick, onSignupClick, isAuthenticated = false, showSearch = false }: HeaderProps) => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SyncFlow
            </Link>
          </div>

          {/* Search Bar - only show if specified */}
          {showSearch && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-gray-100 border-none"
                />
              </div>
            </div>
          )}

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <nav className="hidden md:flex items-center space-x-8">
                  <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">HOME</Link>
                  <button 
                    onClick={scrollToFeatures}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    FEATURES
                  </button>
                  <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">ABOUT</Link>
                  <button 
                    onClick={onLoginClick}
                    className="text-gray-700 hover:text-blue-600 font-medium"
                  >
                    LOG IN
                  </button>
                </nav>
                <Button 
                  onClick={onSignupClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
                >
                  GET STARTED
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Connect Socials
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt="@samantha" />
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
