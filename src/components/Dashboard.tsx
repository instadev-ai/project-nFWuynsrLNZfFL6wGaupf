import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface FeatureSuggestion {
  id: number;
  title: string;
  description: string;
  votes: number;
  status: "new" | "in-progress" | "completed";
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
  author: string;
}

const Dashboard = () => {
  const [suggestions, setSuggestions] = useState<FeatureSuggestion[]>([
    {
      id: 1,
      title: "Dark Mode Support",
      description: "Add dark mode support for better night-time viewing",
      votes: 15,
      status: "in-progress",
      comments: [
        { id: 1, text: "This would be great!", author: "User1" },
      ],
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Create a mobile app version",
      votes: 10,
      status: "new",
      comments: [],
    },
  ]);

  const [sortBy, setSortBy] = useState("votes");
  const [newFeature, setNewFeature] = useState({ title: "", description: "" });

  const handleVote = (id: number) => {
    setSuggestions(
      suggestions.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, votes: suggestion.votes + 1 }
          : suggestion
      )
    );
  };

  const handleAddFeature = () => {
    if (newFeature.title && newFeature.description) {
      setSuggestions([
        ...suggestions,
        {
          id: suggestions.length + 1,
          ...newFeature,
          votes: 0,
          status: "new",
          comments: [],
        },
      ]);
      setNewFeature({ title: "", description: "" });
    }
  };

  const sortedSuggestions = [...suggestions].sort((a, b) => {
    if (sortBy === "votes") return b.votes - a.votes;
    return b.id - a.id;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Feature Suggestions
          </h1>
          <p className="text-gray-600">
            Help us improve by suggesting new features or voting on existing ones.
          </p>
        </div>

        <div className="mb-8 space-y-4 rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">
            Suggest a New Feature
          </h2>
          <Input
            placeholder="Feature title"
            value={newFeature.title}
            onChange={(e) =>
              setNewFeature({ ...newFeature, title: e.target.value })
            }
            className="mb-4"
          />
          <Textarea
            placeholder="Describe your feature suggestion..."
            value={newFeature.description}
            onChange={(e) =>
              setNewFeature({ ...newFeature, description: e.target.value })
            }
            className="mb-4"
          />
          <Button onClick={handleAddFeature}>Submit Suggestion</Button>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Current Suggestions
          </h2>
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Most Voted</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {sortedSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {suggestion.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{suggestion.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        suggestion.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : suggestion.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {suggestion.status.replace("-", " ")}
                    </span>
                    <span className="text-sm text-gray-500">
                      {suggestion.comments.length} comments
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(suggestion.id)}
                    className="flex flex-col items-center"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span className="text-sm font-medium">{suggestion.votes}</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;