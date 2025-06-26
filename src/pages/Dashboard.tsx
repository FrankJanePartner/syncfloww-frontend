import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import WorkflowCard from "@/components/WorkflowCard";
import BrandSetup from "@/components/BrandSetup";
import useSecureAuth from "../hooks/useSecureAuth";

const Dashboard = () => {
  const { user } = useSecureAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [showBrandSetup, setShowBrandSetup] = useState(false);
  const navigate = useNavigate();

  const handleSidebarClick = (item: string) => {
    setActiveView(item);
    
    // Navigate to dedicated pages for certain items
    switch (item) {
      case "analytics":
        navigate("/analytics");
        break;
      case "workflows":
        navigate("/workflow-builder");
        break;
      case "messages":
        navigate("/inbox");
        break;
      default:
        // Stay on dashboard for other items
        break;
    }
  };

  if (showBrandSetup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isAuthenticated={true} showSearch={true} />
        <BrandSetup 
          onBack={() => setShowBrandSetup(false)}
          onComplete={() => setShowBrandSetup(false)}
        />
      </div>
    );
  }

  const renderDashboardContent = () => {
    const fullName = user?.name || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {firstName} {lastName}!
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">New Comments (Today)</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">45</span>
            <span className="text-xs text-green-600">+15 vs. yesterday</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Followers"
            value="15,231"
            change="+12% vs. last month"
            changeType="positive"
          />
          <StatsCard
            title="Avg. Engagement Rate"
            value="3.8%"
            change="+0.5% vs. last month"
            changeType="positive"
          />
          <StatsCard
            title="Post Reach (Last 7 Days)"
            value="87,500"
            change="-5% vs. previous 7 days"
            changeType="negative"
          />
          <StatsCard
            title="New Comments (Today)"
            value="45"
            change="+15 vs. yesterday"
            changeType="positive"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">AI Chat Assistant</h2>
            <button className="text-red-500 hover:text-red-600 text-sm">Delete</button>
          </div>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">Ask anything</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">💬</span>
              <span className="text-2xl">🎯</span>
              <span className="text-2xl">⬇️</span>
            </div>
            <div className="mt-4 space-y-2">
              <button 
                onClick={() => navigate("/post-management")}
                className="block w-full text-left px-4 py-2 bg-white rounded border hover:bg-gray-50"
              >
                + Create Post
              </button>
              <button className="block w-full text-left px-4 py-2 bg-white rounded border hover:bg-gray-50">
                + New Brand
              </button>
              <button className="block w-full text-left px-4 py-2 bg-white rounded border hover:bg-gray-50">
                👥 Assign new members
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm text-gray-600">Instagram</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🐦</div>
              <p className="text-sm text-gray-600">Twitter</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📘</div>
              <p className="text-sm text-gray-600">Facebook</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💼</div>
              <p className="text-sm text-gray-600">LinkedIn</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Connect more platforms to unlock full insights.
          </p>
          <div className="text-center mt-4">
            <button 
              onClick={() => navigate("/social-integration")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Manage Social Accounts
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWorkflowsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create Workflow
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            Content Publishing
            <button className="ml-2 text-gray-400 hover:text-gray-600">+</button>
          </h3>
          <WorkflowCard
            title="Automated Instagram Post"
            description="New article published"
            status="active"
            lastRun="2024-07-26"
            successRate={95}
            runs={120}
          />
          <WorkflowCard
            title="Schedule Blog Promotion"
            description="New blog post"
            status="active"
            lastRun="2024-07-25"
            successRate={99}
            runs={75}
          />
          <WorkflowCard
            title="Draft Facebook Post"
            description="Event calendar update"
            status="paused"
            lastRun="2024-07-20"
            successRate={65}
            runs={30}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            Engagement Automation
            <button className="ml-2 text-gray-400 hover:text-gray-600">+</button>
          </h3>
          <WorkflowCard
            title="Respond to Twitter Mention"
            description="New Tweet mention"
            status="active"
            lastRun="2024-07-26"
            successRate={88}
            runs={345}
          />
          <WorkflowCard
            title="Welcome New Follower - LinkedIn"
            description="New LinkedIn follower"
            status="draft"
            lastRun="N/A"
            successRate={0}
            runs={0}
          />
          <WorkflowCard
            title="Retweet Positive Mentions"
            description="Positive Tweet mention"
            status="active"
            lastRun="2024-07-26"
            successRate={98}
            runs={210}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center">
            Monitoring & Reporting
            <button className="ml-2 text-gray-400 hover:text-gray-600">+</button>
          </h3>
          <WorkflowCard
            title="Weekly Performance Report"
            description="Every Monday 9 AM"
            status="active"
            lastRun="2024-07-22"
            successRate={100}
            runs={48}
            schedule="Every Monday 9 AM"
          />
          <WorkflowCard
            title="Auto-Reply to Support Query"
            description="New support email"
            status="paused"
            lastRun="2024-07-19"
            successRate={70}
            runs={80}
          />
          <WorkflowCard
            title="Monitor Competitor Activity"
            description="Daily check"
            status="active"
            lastRun="2024-07-26"
            successRate={92}
            runs={360}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} showSearch={true} />
      <div className="flex">
        <Sidebar activeItem={activeView} onItemClick={handleSidebarClick} />
        <main className="flex-1 p-8">
          {activeView === "dashboard" && renderDashboardContent()}
          {activeView === "workflows" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Workflow Builder...</h2>
            </div>
          )}
          {activeView === "team" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Management</h2>
              <p className="text-gray-600">Team management features coming soon...</p>
              <button 
                onClick={() => setShowBrandSetup(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Set Up Brand
              </button>
            </div>
          )}
          {activeView === "messages" && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Inbox...</h2>
            </div>
          )}
          {(activeView === "calendar" || activeView === "settings" || activeView === "help") && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
              <p className="text-gray-600">This feature is coming soon...</p>
              {activeView === "settings" && (
                <button 
                  onClick={() => navigate("/social-integration")}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Manage Integrations
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;