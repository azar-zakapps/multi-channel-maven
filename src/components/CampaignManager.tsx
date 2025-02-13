
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Plus, Megaphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

type Channel = "TikTok" | "Meta" | "TV" | "YouTube" | "Pinterest";

interface Campaign {
  id: string;
  name: string;
  channels: Channel[];
  startDate: Date;
  endDate: Date;
}

interface CampaignForm {
  name: string;
  channels: Channel[];
  startDate: Date;
  endDate: Date;
}

const AVAILABLE_CHANNELS: Channel[] = ["TikTok", "Meta", "TV", "YouTube", "Pinterest"];

export const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Sale 2024",
      channels: ["TikTok", "Meta"],
      startDate: new Date(2024, 5, 1),
      endDate: new Date(2024, 5, 30),
    },
  ]);
  const [open, setOpen] = useState(false);

  const form = useForm<CampaignForm>({
    defaultValues: {
      name: "",
      channels: [],
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = (data: CampaignForm) => {
    const newCampaign: Campaign = {
      id: Math.random().toString(36).substring(7),
      ...data,
    };
    setCampaigns([...campaigns, newCampaign]);
    setOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Campaign Manager</h1>
          <p className="text-gray-500 mt-1">Manage your marketing campaigns across multiple channels</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter campaign name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="channels"
                  render={() => (
                    <FormItem>
                      <FormLabel>Channels</FormLabel>
                      <div className="grid grid-cols-2 gap-4">
                        {AVAILABLE_CHANNELS.map((channel) => (
                          <FormField
                            key={channel}
                            control={form.control}
                            name="channels"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(channel)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...field.value, channel]);
                                      } else {
                                        field.onChange(
                                          field.value?.filter((value) => value !== channel)
                                        );
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{channel}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="border rounded-md"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="border rounded-md"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Create Campaign</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">{campaign.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {campaign.channels.map((channel) => (
                    <span
                      key={channel}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {format(campaign.startDate, "MMM d, yyyy")} -{" "}
                  {format(campaign.endDate, "MMM d, yyyy")}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
