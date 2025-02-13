
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Youtube, Facebook, Video } from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Welcome back!</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your campaigns</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-white/50 border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Campaigns</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-white/50 border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Youtube className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">YouTube Reach</p>
              <p className="text-2xl font-semibold">2.4M</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-white/50 border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Facebook className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Meta Engagement</p>
              <p className="text-2xl font-semibold">85.2K</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-white/50 border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Campaigns</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-2 bg-primary/10 rounded">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Summer Collection {i}</h3>
                  <p className="text-sm text-gray-500">Last updated 2h ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-sm bg-white/50 border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Channel Performance</h2>
          <div className="space-y-4">
            {[
              { name: "TikTok", progress: 78 },
              { name: "Meta", progress: 65 },
              { name: "YouTube", progress: 89 },
            ].map((channel) => (
              <div key={channel.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{channel.name}</span>
                  <span className="text-gray-500">{channel.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${channel.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
