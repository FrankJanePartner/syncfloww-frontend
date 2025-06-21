
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PostManagement = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("Twitter");
  const [postContent, setPostContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const scheduledPosts = [
    {
      id: 1,
      title: "Spring Collection Launch Announcement",
      platform: "Instagram",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Weekly Tip: Boost Your Engagement",
      platform: "Twitter",
      date: "2024-03-18",
      time: "02:30 PM",
      status: "scheduled"
    },
    {
      id: 3,
      title: "New Blog Post: 5 Ways to Use Our Product",
      platform: "LinkedIn",
      date: "2024-03-17",
      time: "11:30 AM",
      status: "scheduled"
    }
  ];

  const draftPosts = [
    {
      id: 1,
      title: "Q2 Planning - Initial Ideas",
      status: "Draft"
    },
    {
      id: 2,
      title: "Holiday Campaign Brainstorm",
      status: "Needs Review"
    },
    {
      id: 3,
      title: "New Feature Explainer Video Script",
      status: "Draft"
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Post Management</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Analytics</Button>
          <Button variant="outline">Assign Team Members</Button>
          <Button variant="outline">Manage Social Accounts</Button>
          <Button variant="outline">AI Insights</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <p className="text-sm text-gray-600">Draft, schedule, and manage content for your brand.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button 
              variant={selectedPlatform === "Twitter" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("Twitter")}
            >
              Twitter
            </Button>
            <Button 
              variant={selectedPlatform === "Instagram" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("Instagram")}
            >
              Instagram
            </Button>
            <Button 
              variant={selectedPlatform === "LinkedIn" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("LinkedIn")}
            >
              LinkedIn
            </Button>
          </div>

          <Tabs defaultValue="text" className="w-full">
            <TabsList>
              <TabsTrigger value="text">Text Post</TabsTrigger>
              <TabsTrigger value="media">Media Post</TabsTrigger>
            </TabsList>
            <TabsContent value="text">
              <Textarea
                placeholder="Write your post for twitter..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[150px]"
              />
            </TabsContent>
            <TabsContent value="media">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Upload media files here</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Input
              type="date"
              placeholder="Schedule Date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
            <Input
              type="time"
              placeholder="Schedule Time (e.g., 10:00 AM)"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Save Draft</Button>
            <Button variant="outline">Schedule Post</Button>
            <Button>Publish Now</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Scheduled Posts ({scheduledPosts.length})
              <span className="text-sm text-gray-500">Upcoming content ready to be published</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 space-y-2">
                <h4 className="font-medium">{post.title}</h4>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.platform} on {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    at {post.time}
                  </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Draft Posts ({draftPosts.length})
              <span className="text-sm text-gray-500">Incomplete or pending review content</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {draftPosts.map((post) => (
              <div key={post.id} className="border rounded-lg p-4 space-y-2">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-500">Status: {post.status}</p>
                <div className="flex justify-end space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    Discard
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Calendar component would be implemented here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostManagement;
