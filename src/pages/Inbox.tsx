
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Filter, ArrowUpDown, Eye } from "lucide-react";

const Inbox = () => {
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const inboxStats = [
    {
      title: "Unread Messages",
      value: "9",
      subtitle: "Requires action",
      color: "text-green-600"
    },
    {
      title: "Reply Rate", 
      value: "40.0%",
      subtitle: "Overall engagement",
      color: "text-blue-600"
    },
    {
      title: "Positive Sentiment",
      value: "67%",
      subtitle: "Of analyzed messages", 
      color: "text-green-600"
    },
    {
      title: "Total Messages",
      value: "15",
      subtitle: "Inbox volume",
      color: "text-gray-600"
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "Alice Wonderland",
      avatar: "👩",
      subject: "Re: Your latest newsletter on product updates",
      preview: "Thank you for the detailed newsletter! I found the new feature integration particularly useful...",
      time: "2 hours ago",
      platform: "email",
      unread: true
    },
    {
      id: "2", 
      sender: "Fashion Guru",
      avatar: "👤",
      subject: 'Comment on "New Line Launch" post',
      preview: "This new line looks amazing! When is the official release date? My friends and I are hyped...",
      time: "Yesterday",
      platform: "facebook",
      unread: true
    },
    {
      id: "3",
      sender: "Fashionista_Chic", 
      avatar: "👩‍🎨",
      subject: 'Comment on "Summer Collection" post',
      preview: "Love the new summer collection! 😍 Especially the floral prints. Where can I buy them?",
      time: "Yesterday", 
      platform: "instagram",
      unread: false
    }
  ];

  const handleSelectAll = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map(m => m.id));
    }
  };

  const handleSelectMessage = (messageId: string) => {
    setSelectedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAuthenticated={true} showSearch={true} />
      <div className="flex">
        <Sidebar activeItem="messages" />
        <main className="flex-1 p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {inboxStats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Messages List */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          checked={selectedMessages.length === messages.length}
                          onCheckedChange={handleSelectAll}
                        />
                        <span className="text-sm font-medium">Select All</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-0">
                    {messages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3 p-4 border-b border-gray-100 hover:bg-gray-50">
                        <Checkbox 
                          checked={selectedMessages.includes(message.id)}
                          onCheckedChange={() => handleSelectMessage(message.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{message.avatar}</span>
                            <div className="flex items-center space-x-2">
                              {message.platform === "email" && <span>📧</span>}
                              {message.platform === "facebook" && <span>📘</span>}
                              {message.platform === "instagram" && <span>📷</span>}
                              <span className="font-medium text-sm">{message.sender}</span>
                            </div>
                          </div>
                          <h4 className={`text-sm mb-1 ${message.unread ? "font-semibold" : "font-normal"}`}>
                            {message.subject}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                            {message.preview}
                          </p>
                          <p className="text-xs text-gray-500">{message.time}</p>
                        </div>
                        {message.unread && (
                          <Badge variant="default" className="bg-blue-100 text-blue-800">
                            New
                          </Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Select a message to view details</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Click on any message in the list to see its full content and actions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Inbox;
