import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import VoiceRecorder from "./VoiceRecorder";
import PasswordReset from "./PasswordReset";
import SecureForm from "./SecureForm";
import { loginSchema, signupSchema } from "@/lib/validation";
import useSecureAuth from "@/hooks/useSecureAuth";
import { z } from "zod";
import { buildApiUrl, API_CONFIG } from "@/lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup" | "verify";
  onModeChange: (mode: "login" | "signup" | "verify") => void;
  onSignup?: () => void;
  onLogin?: () => void;
}

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const AuthModal = ({ isOpen, onClose, mode, onModeChange, onSignup, onLogin }: AuthModalProps) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordResetMode, setPasswordResetMode] = useState<"email" | "newPassword">("email");
  const { login, signup } = useSecureAuth();

  const handleLoginSubmit = async (data: LoginFormData) => {
    const result = await login({
      email: data.email,
      password: data.password
    });
    if (result.success) {
      onLogin?.();
      onClose();
    }
  };

  const handleSignupSubmit = async (data: SignupFormData) => {
    const result = await signup({
      email: data.email,
      password1: data.password,
      password2: data.confirmPassword,
      first_name: data.firstName,
      last_name: data.lastName
    });

    if (!result.success) {
      console.error("Signup error:", result);
      alert("Signup failed. Check the console for details.");
      return;
    }

    onModeChange("verify");
  };

  const handleVerifyDone = async () => {
    try {
      // Call backend to check if user is active (verified)
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USER), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if needed
        },
        credentials: 'include' // to send cookies if backend uses session auth
      });

      if (!response.ok) {
        throw new Error('Verification check failed');
      }

      const data = await response.json();

      if (data.is_active) {
        onSignup?.();
        onClose();
      } else {
        alert('Your email is not verified yet. Please verify before proceeding.');
      }
    } catch (error) {
      console.error('Verification check error:', error);
      alert('Error checking verification status. Please try again later.');
    }
  };

  const handleVoiceRecording = (audioBlob: Blob) => {
    console.log("Voice recording completed:", audioBlob);
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
    setPasswordResetMode("email");
  };

  const renderLoginForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Let's Get Started!</p>
      </div>

      <SecureForm
        schema={loginSchema}
        onSubmit={handleLoginSubmit}
        fields={[
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Email' },
          { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' }
        ]}
        submitText="Log In"
        className="space-y-4"
      />

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
          <Switch checked={rememberMe} onCheckedChange={setRememberMe} />
          <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
        </div>
        <button 
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Forgotten Password?
        </button>
      </div>

      <div className="text-center">
        <span className="text-gray-600">New User? </span>
        <button 
          type="button"
          onClick={() => onModeChange("signup")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Sign Up
        </button>
      </div>

      <div className="flex justify-center pt-4">
        <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
      </div>
    </div>
  );

  const renderSignupForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="First Name" />
          </div>
          <div className="flex-1">
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Last Name" />
          </div>
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
          <Input id="email" name="email" type="email" placeholder="Email Address" />
        </div>
        <div>
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Password" />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" />
        </div>
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold">
          Create account
        </Button>
      </form>

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

      <div className="text-center">
        <span className="text-gray-600">Already a User? </span>
        <button 
          onClick={() => onModeChange("login")}
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Log in
        </button>
      </div>

      <div className="flex justify-center pt-4">
        <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
      </div>
    </div>
  );

  const renderVerifyForm = () => (
    <div className="space-y-6 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your E-mail Address</h2>
        <p className="text-gray-600 italic">A link to Verify your E-mail Address has been sent</p>
        <p className="text-gray-600 italic">Click On it to Verify your E-mail Address</p>
      </div>

      <Button 
        onClick={handleVerifyDone}
        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-full"
      >
        Done
      </Button>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen && !showPasswordReset} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby="auth-dialog-description">
        <DialogTitle className="sr-only">Authentication Dialog</DialogTitle>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <div className="p-6" id="auth-dialog-description">
          {mode === "login" && renderLoginForm()}
          {mode === "signup" && (
            <>
              <div className="text-center mb-6">
                <DialogDescription>Enter your credentials to access your account.</DialogDescription>
              </div>
              {renderSignupForm()}
            </>
          )}
          {mode === "verify" && renderVerifyForm()}
        </div>
      </DialogContent>
      </Dialog>

      <PasswordReset
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        mode={passwordResetMode}
        onModeChange={setPasswordResetMode}
      />
    </>
  );
};

export default AuthModal;
