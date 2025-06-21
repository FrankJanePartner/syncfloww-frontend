
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import VoiceRecorder from "./VoiceRecorder";

interface PasswordResetProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "email" | "newPassword";
  onModeChange: (mode: "email" | "newPassword") => void;
}

const PasswordReset = ({ isOpen, onClose, mode, onModeChange }: PasswordResetProps) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
    // In a real app, this would send the reset email
    onModeChange("newPassword");
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log("Password reset successful");
    onClose();
  };

  const handleVoiceRecording = (audioBlob: Blob) => {
    console.log("Voice recording completed:", audioBlob);
  };

  const renderEmailForm = () => (
    <div className="space-y-6 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p className="text-gray-600">Enter your E-mail Address below</p>
        <p className="text-gray-600 italic text-sm mt-2">A link to reset your Password would be sent to you</p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
          required
        />

        <div className="flex space-x-4">
          <Button 
            type="button"
            variant="outline"
            onClick={() => onClose()}
            className="flex-1 py-3 rounded-full"
          >
            Back to Sign In
          </Button>
          <Button 
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full"
          >
            Send Link
          </Button>
        </div>
      </form>

      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-700 text-sm">
          Forgot or lost your email address?
        </button>
      </div>

      <div className="flex justify-center pt-4">
        <VoiceRecorder onRecordingComplete={handleVoiceRecording} />
      </div>
    </div>
  );

  const renderNewPasswordForm = () => (
    <div className="space-y-6 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter your new password</h2>
        <p className="text-gray-600 italic">Your new password must be different from the old password</p>
      </div>

      <form onSubmit={handlePasswordReset} className="space-y-4">
        <Input
          placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
          required
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500"
          required
        />

        <Button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          {mode === "email" && renderEmailForm()}
          {mode === "newPassword" && renderNewPasswordForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordReset;
