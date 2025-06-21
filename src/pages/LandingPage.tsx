import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";

interface LandingPageProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onSignup?: () => void;
}

const LandingPage = ({ onLoginClick, onSignupClick, onSignup }: LandingPageProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "verify">("signup");

  const handleAuthModalSignup = () => {
    onSignup?.();
    setShowAuthModal(false);
  };

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Content Generation",
      description: "Create engaging content automatically with advanced AI that understands your brand voice and audience preferences."
    },
    {
      icon: "📅",
      title: "Smart Scheduling & Publishing",
      description: "Optimize your posting times across all social platforms with intelligent scheduling that maximizes engagement."
    },
    {
      icon: "📊",
      title: "In-Depth Performance Analytics",
      description: "Track your social media performance with comprehensive analytics and actionable insights to grow your audience."
    },
    {
      icon: "👥",
      title: "Multi-Brand & Team Management",
      description: "Manage multiple brands and collaborate with your team seamlessly with role-based permissions and workflows."
    },
    {
      icon: "📈",
      title: "Competitor Monitoring",
      description: "Stay ahead of the competition by monitoring their social media strategies and identifying opportunities."
    },
    {
      icon: "⚡",
      title: "Custom Workflow Automation",
      description: "Automate repetitive tasks and create custom workflows that save time and ensure consistency across campaigns."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header 
        onLoginClick={onLoginClick}
        onSignupClick={() => {
          setAuthMode("signup");
          setShowAuthModal(true);
        }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Revolutionize Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Social Media Marketing
                </span>{" "}
                with AI Assistance
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Automate your marketing tasks, Optimize your content, and analyze your performance with AI-powered tools.
              </p>
              <Button 
                onClick={onSignupClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Social Stats</span>
                    <span className="text-xs text-gray-400">Real-time</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">15.2K</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">3.8%</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-200 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full w-3/4"></div>
                    </div>
                    <div className="h-2 bg-purple-200 rounded-full">
                      <div className="h-2 bg-purple-600 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Features</h2>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Powerful Features for Every Brand</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SyncflowAI Works</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multi-Platform Management</h4>
                  <p className="text-gray-600">Manage all your social accounts from one centralized dashboard with seamless integration.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Automated Scheduling</h4>
                  <p className="text-gray-600">Set up automated posting schedules that optimize for maximum engagement across time zones.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Content Curation</h4>
                  <p className="text-gray-600">AI-powered content suggestions and automated curation based on your audience preferences.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <img 
                src="/placeholder.svg" 
                alt="Dashboard mockup" 
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            All the power that you need for your Social Media Marketing here!
          </h2>
          <Button 
            onClick={onSignupClick}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </Button>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSignup={handleAuthModalSignup}
      />
    </div>
  );
};

export default LandingPage;
