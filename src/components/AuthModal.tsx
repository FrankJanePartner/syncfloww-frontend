import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import VoiceRecorder from "./VoiceRecorder";
import PasswordReset from "./PasswordReset";
import SecureForm from "./SecureForm";
import { loginSchema, signupSchema } from "@/lib/validation";
import { useSecureAuth } from "@/hooks/useSecureAuth";
import { z } from "zod";

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
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    });
    if (result.success) {
      onModeChange("verify");
    }
  };

  const handleVerifyDone = () => {
    onSignup?.();
    onClose();
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

      <SecureForm
        schema={signupSchema}
        onSubmit={handleSignupSubmit}
        fields={[
          { name: 'firstName', label: 'First Name', placeholder: 'First Name' },
          { name: 'lastName', label: 'Last Name', placeholder: 'Last Name' },
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Email Address' },
          { name: 'password', label: 'Password', type: 'password', placeholder: 'Password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password' }
        ]}
        submitText="Create account"
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
        <DialogContent className="sm:max-w-md">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-6">
            {mode === "login" && renderLoginForm()}
            {mode === "signup" && renderSignupForm()}
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
