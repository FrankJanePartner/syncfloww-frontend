
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowCardProps {
  title: string;
  description: string;
  status: "active" | "draft" | "paused";
  lastRun?: string;
  successRate?: number;
  runs?: number;
  schedule?: string;
  className?: string;
}

const WorkflowCard = ({ 
  title, 
  description, 
  status, 
  lastRun, 
  successRate, 
  runs, 
  schedule,
  className 
}: WorkflowCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {schedule && (
        <p className="text-xs text-gray-500 mb-3">{schedule}</p>
      )}

      <div className="flex items-center justify-between mb-3">
        {lastRun && (
          <span className="text-xs text-gray-500">Last Run: {lastRun}</span>
        )}
        <Badge className={getStatusColor(status)} variant="secondary">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>

      {successRate !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
            <span>Success Rate: {successRate}%</span>
            {runs && <span>Runs: {runs}</span>}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowCard;
