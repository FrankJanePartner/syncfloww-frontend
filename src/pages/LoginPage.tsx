import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";

import useSecureAuth from "../hooks/useSecureAuth";

interface LoginPageProps {
  onSignupClick?: () => void;
}

const LoginPage = ({ onSignupClick }: LoginPageProps) => {
  useDocumentTitle("Login");

  const { login } = useSecureAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
    const result = await login({ email, password });
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert("Login failed: " + (result.error || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
          <div className="text-center mb-8">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SyncFlow
            </span>
          </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Let's Get Started!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold"
            >
              Log In
            </Button>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full border-2">
                <span className="text-blue-600 text-xl">f</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-2">
                <span className="text-gray-800 text-xl">🍎</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-2">
                <span className="text-red-500 text-xl">G</span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remember"
                  checked={rememberMe} 
                  onCheckedChange={setRememberMe} 
                />
                <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-red-500 hover:text-red-600">
                Forgotten Password?
              </a>
            </div>

            <div className="text-center">
              <span className="text-gray-600">New User? </span>
              <button 
                type="button"
                onClick={onSignupClick}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
