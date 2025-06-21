
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { TrendingUp, TrendingDown, Users, MessageCircle, Eye, Heart } from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30");
  const [platform, setPlatform] = useState("all");

  const metrics = [
    {
      title: "Total Reach",
      value: "1.5M",
      change: "+12% vs last period",
      changeType: "positive" as const,
      subtitle: "Across all platforms"
    },
    {
      title: "Total Engagement", 
      value: "250K",
      change: "+18% vs last period",
      changeType: "positive" as const,
      subtitle: "Likes, comments, shares, etc."
    },
    {
      title: "Follower Growth",
      value: "+8.5K",
      change: "+7% vs last period", 
      changeType: "positive" as const,
      subtitle: "New followers gained"
    },
    {
      title: "Average Engagement Rate",
      value: "4.1%",
      change: "+0.3% vs last period",
      changeType: "positive" as const,
      subtitle: "Per post"
    }
  ];

  const topPosts = [
    {
      platform: "instagram",
      platformIcon: "📷",
      preview: "Our new summer collection is here! Check ou...",
      engagement: "15,200",
      reach: "180,000"
    },
    {
      platform: "facebook", 
      platformIcon: "📘",
      preview: "Join us for a live Q&A session with our CEO f...",
      engagement: "12,800",
      reach: "150,000"
    },
    {
      platform: "twitter",
      platformIcon: "🐦", 
      preview: "Thread: 10 Tips for Boosting Your Brand Onli...",
      engagement: "9,500",
      reach: "120,000"
    },
    {
      platform: "linkedin",
      platformIcon: "💼",
      preview: "Exciting news! We've partnered with Industry...",
      engagement: "8,800",
      reach: "90,000"
    },
    {
      platform: "instagram",
      platformIcon: "📷",
      preview: "Behind the scenes look at our product devel...",
      engagement: "7,200",
      reach: "110,000"
    },
    {
      platform: "facebook",
      platformIcon: "📘",
      preview: "Weekly roundup: Top trends in digital market...",
      engagement: "6,800",
      reach: "95,000"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} showSearch={true} />
      <div className="flex">
        <Sidebar activeItem="analytics" />
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
                <p className="text-gray-600">Comprehensive insights into your brand's performance.</p>
              </div>
              <div className="flex space-x-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="90">Last 90 Days</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <div className="flex items-center space-x-1">
                        {metric.changeType === "positive" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                          {metric.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{metric.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends Over Time</CardTitle>
                  <p className="text-sm text-gray-600">Monthly engagement (likes, comments, shares)</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Engagement chart placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <p className="text-sm text-gray-600">Breakdown by age group</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Demographics chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reach Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Reach Trends Over Time</CardTitle>
                <p className="text-sm text-gray-600">Monthly unique users reached.</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Reach trends chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <p className="text-sm text-gray-600">Posts with the highest engagement in the selected period.</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                    <div>Platform</div>
                    <div>Content Preview</div>
                    <div>Engagement</div>
                    <div>Reach</div>
                  </div>
                  {topPosts.map((post, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{post.platformIcon}</span>
                      </div>
                      <div className="text-sm text-gray-600">{post.preview}</div>
                      <div className="font-medium">{post.engagement}</div>
                      <div className="font-medium">{post.reach}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
