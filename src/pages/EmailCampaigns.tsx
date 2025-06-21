
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Send, Plus, Lightbulb, Mic } from "lucide-react";

const EmailCampaigns = () => {
  const [recipientSegment, setRecipientSegment] = useState("product-announcement");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} showSearch={true} />
      <div className="flex">
        <Sidebar activeItem="messages" />
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Main Campaign Builder */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 min-h-[400px]">
              {/* AI Chat Input */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-6">
                <div className="relative">
                  <Input
                    placeholder="Ask anything"
                    className="w-full pr-20 py-6 text-center border-2 border-gray-300 rounded-full bg-white shadow-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="p-2 h-8 w-8 rounded-full">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2 h-8 w-8 rounded-full">
                      <Lightbulb className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2 h-8 w-8 rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="p-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700">
                      <Send className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient Segmentation Panel */}
            <Card className="absolute top-1/2 right-8 transform -translate-y-1/2 w-80">
              <CardHeader>
                <CardTitle className="text-lg">Recipient Segmentation</CardTitle>
                <p className="text-sm text-gray-600">Define the target audience for this campaign.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select a Segment</label>
                  <Select value={recipientSegment} onValueChange={setRecipientSegment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-announcement">Product Announcement List</SelectItem>
                      <SelectItem value="newsletter">Newsletter Subscribers</SelectItem>
                      <SelectItem value="vip-customers">VIP Customers</SelectItem>
                      <SelectItem value="new-subscribers">New Subscribers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Deploy Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailCampaigns;
