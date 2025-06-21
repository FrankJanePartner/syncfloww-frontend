
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ExternalLink, Settings } from "lucide-react";

const SocialIntegration = () => {
  const [activeTab, setActiveTab] = useState("active");

  const platforms = [
    {
      id: "instagram",
      name: "Instagram",
      icon: "📷",
      url: "instagram.com",
      description: "Visual-first platform for building brand presence through photos, reels, and stories.",
      status: "active",
      connected: true
    },
    {
      id: "facebook", 
      name: "Facebook",
      icon: "📘",
      url: "facebook.com",
      description: "Powerful for community building, paid ads, and connecting with broad audiences.",
      status: "active", 
      connected: true
    },
    {
      id: "pinterest",
      name: "Pinterest", 
      icon: "📌",
      url: "pinterest.com",
      description: "Inspiration-driven platform for discovery and visual bookmarking, great for fashion, lifestyle, and trends.",
      status: "active",
      connected: true
    },
    {
      id: "twitter",
      name: "Twitter (X)",
      icon: "❌",
      url: "x.com", 
      description: "Real-time updates, trending conversations, and direct brand communication",
      status: "active",
      connected: true
    },
    {
      id: "linkedin",
      name: "Linked IN",
      icon: "💼", 
      url: "linkedin.com",
      description: "Professional network ideal for B2B marketing, brand authority, and thought leadership.",
      status: "active",
      connected: true
    }
  ];

  const filteredPlatforms = platforms.filter(platform => {
    if (activeTab === "active") return platform.status === "active";
    if (activeTab === "inactive") return platform.status === "inactive";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} showSearch={true} />
      <div className="flex">
        <Sidebar activeItem="settings" />
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Integration</h1>
              </div>
              <div className="flex-1 max-w-md">
                <Input placeholder="Search" className="w-full" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              <Button
                variant={activeTab === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("all")}
                className={activeTab === "all" ? "bg-white shadow-sm" : ""}
              >
                View all
              </Button>
              <Button
                variant={activeTab === "active" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("active")}
                className={activeTab === "active" ? "bg-white shadow-sm" : ""}
              >
                Active
              </Button>
              <Button
                variant={activeTab === "inactive" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("inactive")}
                className={activeTab === "inactive" ? "bg-white shadow-sm" : ""}
              >
                Inactive
              </Button>
              <Button
                variant={activeTab === "custom" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("custom")}
                className={activeTab === "custom" ? "bg-white shadow-sm" : ""}
              >
                Custom
              </Button>
            </div>

            {/* Platform Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlatforms.map((platform) => (
                <Card key={platform.id} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{platform.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{platform.name}</CardTitle>
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="text-sm text-gray-600">{platform.url}</span>
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{platform.description}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">Manage</span>
                      </div>
                      <Switch 
                        checked={platform.connected} 
                        onCheckedChange={() => {}}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SocialIntegration;
