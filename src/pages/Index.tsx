import { useState } from "react";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import AuthModal from "../components/AuthModal";
import useSecureAuth from "../hooks/useSecureAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Index = () => {
  const { isAuthenticated } = useSecureAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "verify">("login");

  let title = "Landing";
  if (isAuthenticated) {
    title = "Dashboard";
  } else if (isAuthModalOpen) {
    if (authMode === "login") {
      title = "Login";
    } else if (authMode === "signup") {
      title = "Signup";
    }
  }
  useDocumentTitle(title);

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
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Index;
