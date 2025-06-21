
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Calendar } from "lucide-react";

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");

  const workflowColumns = [
    {
      title: "Initial Planning",
      count: 3,
      tasks: [
        {
          title: "Define workflow objectives",
          description: "Clearly outline the goals and outcomes",
          date: "Today",
          subtasks: 3
        },
        {
          title: "Research best practices", 
          description: "Gather information on similar successful workflows",
          date: "Tomorrow"
        },
        {
          title: "Map out high-level steps",
          description: ""
        }
      ]
    },
    {
      title: "Automation Design",
      count: 2,
      tasks: [
        {
          title: "Identify automation triggers",
          description: "",
          subtasks: 3
        },
        {
          title: "Design automation sequences",
          description: ""
        }
      ]
    },
    {
      title: "Deployment & Monitoring", 
      count: 3,
      tasks: [
        {
          title: "Prepare deployment environment",
          description: "",
          subtasks: 3
        },
        {
          title: "Deploy workflow",
          description: ""
        },
        {
          title: "Set up monitoring alerts",
          description: "",
          date: "End of the month"
        }
      ]
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none outline-none"
          />
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Workflow</Button>
            <Button variant="outline" size="sm">Settings</Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Save</Button>
          <Button>Publish</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Builder</CardTitle>
          <p className="text-sm text-gray-600">Design and automate your processes with AI assistance.</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workflowColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center">
                {column.title}
                <Badge variant="secondary" className="ml-2">{column.count}</Badge>
              </h3>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task, taskIndex) => (
                <Card key={taskIndex} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-2">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    {task.description && (
                      <p className="text-xs text-gray-600">{task.description}</p>
                    )}
                    {task.date && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.date}
                      </div>
                    )}
                    {task.subtasks && (
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          ☑️ {task.subtasks}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-300 h-12 text-gray-500 hover:text-gray-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-gray-500 mb-4">Use AI to help build your workflow</p>
              <Button>Get AI Suggestions</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowBuilder;
