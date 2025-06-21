
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const sidebarItems = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "team", icon: "👥", label: "Team" },
  { id: "workflows", icon: "⚡", label: "Workflows" },
  { id: "calendar", icon: "📅", label: "Calendar" },
  { id: "analytics", icon: "📈", label: "Analytics" },
  { id: "messages", icon: "💬", label: "Messages" },
  { id: "settings", icon: "⚙️", label: "Settings" },
  { id: "help", icon: "❓", label: "Help" },
];

const Sidebar = ({ activeItem = "dashboard", onItemClick }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-6">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-normal",
                activeItem === item.id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
              onClick={() => onItemClick?.(item.id)}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
