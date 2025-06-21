
import { useState } from "react";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import AuthModal from "../components/AuthModal";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "verify">("login");

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setIsAuthModalOpen(true);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      <LandingPage 
        onLoginClick={openLoginModal}
        onSignupClick={openSignupModal}
        onSignup={handleSignup}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSignup={handleSignup}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Index;
