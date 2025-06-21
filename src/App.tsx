
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SecurityProvider from "./components/SecurityProvider";
import Index from "./pages/Index";
import About from "./pages/About";
import PostManagement from "./pages/PostManagement";
import Analytics from "./pages/Analytics";
import EmailCampaigns from "./pages/EmailCampaigns";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import Inbox from "./pages/Inbox";
import SocialIntegration from "./pages/SocialIntegration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on client errors (4xx)
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SecurityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/post-management" element={<PostManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/email-campaigns" element={<EmailCampaigns />} />
            <Route path="/workflow-builder" element={<WorkflowBuilder />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/social-integration" element={<SocialIntegration />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SecurityProvider>
  </QueryClientProvider>
);

export default App;
