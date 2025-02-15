
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Plus, Megaphone, Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Channel = "TikTok" | "Meta" | "TV" | "YouTube" | "Pinterest";

interface Campaign {
  id: string;
  name: string;
  channels: Channel[];
  startDate: Date;
  endDate: Date;
  linkedProducts: string[]; // Array of article IDs
}

interface CampaignForm {
  name: string;
  channels: Channel[];
  startDate: Date;
  endDate: Date;
  linkedProducts: string[];
}

interface Product {
  id: string;
  articleId: string;
  title: string;
  price: number;
  weeksCover: number;
  brand: string;
  hierarchy: string;
}

const AVAILABLE_CHANNELS: Channel[] = ["TikTok", "Meta", "TV", "YouTube", "Pinterest"];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "P1",
    articleId: "ART001",
    title: "Summer T-Shirt",
    price: 29.99,
    weeksCover: 8.5,
    brand: "SummerWear",
    hierarchy: "Apparel > Tops > T-Shirts",
  },
  {
    id: "P2",
    articleId: "ART002",
    title: "Denim Jeans",
    price: 59.99,
    weeksCover: 12.0,
    brand: "DenimCo",
    hierarchy: "Apparel > Bottoms > Jeans",
  },
  {
    id: "P3",
    articleId: "ART003",
    title: "Sneakers",
    price: 89.99,
    weeksCover: 6.2,
    brand: "SportFlex",
    hierarchy: "Footwear > Athletic > Sneakers",
  },
  {
    id: "P4",
    articleId: "ART004",
    title: "Beach Hat",
    price: 24.99,
    weeksCover: 4.8,
    brand: "SummerWear",
    hierarchy: "Accessories > Headwear > Hats",
  },
  {
    id: "P5",
    articleId: "ART005",
    title: "Sunglasses",
    price: 79.99,
    weeksCover: 5.5,
    brand: "VisionStyle",
    hierarchy: "Accessories > Eyewear > Sunglasses",
  },
];

export const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Summer Sale 2024",
      channels: ["TikTok", "Meta"],
      startDate: new Date(2024, 5, 1),
      endDate: new Date(2024, 5, 30),
      linkedProducts: ["ART001", "ART004"],
    },
  ]);
  const [open, setOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [filterBy, setFilterBy] = useState<"brand" | "hierarchy" | "articleId">("brand");
  const [filterValue, setFilterValue] = useState("");

  const form = useForm<CampaignForm>({
    defaultValues: {
      name: "",
      channels: [],
      startDate: new Date(),
      endDate: new Date(),
      linkedProducts: [],
    },
  });

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    form.reset({
      name: campaign.name,
      channels: campaign.channels,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      linkedProducts: campaign.linkedProducts,
    });
    setOpen(true);
  };

  const onSubmit = (data: CampaignForm) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => 
        c.id === editingCampaign.id ? { ...data, id: c.id } : c
      ));
    } else {
      const newCampaign: Campaign = {
        id: Math.random().toString(36).substring(7),
        ...data,
      };
      setCampaigns([...campaigns, newCampaign]);
    }
    setOpen(false);
    setEditingCampaign(null);
    form.reset();
  };

  const getFilteredProducts = () => {
    if (!filterValue) return SAMPLE_PRODUCTS;

    return SAMPLE_PRODUCTS.filter(product => {
      switch (filterBy) {
        case "brand":
          return product.brand.toLowerCase().includes(filterValue.toLowerCase());
        case "hierarchy":
          return product.hierarchy.toLowerCase().includes(filterValue.toLowerCase());
        case "articleId":
          return filterValue.split(",").some(id => 
            product.articleId.toLowerCase().includes(id.trim().toLowerCase())
          );
        default:
          return true;
      }
    });
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
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {editingCampaign ? "Edit Campaign" : "Create New Campaign"}
              </DialogTitle>
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

                <div className="space-y-4">
                  <FormLabel>Link Products</FormLabel>
                  <div className="flex gap-4 mb-4">
                    <Select value={filterBy} onValueChange={(value: "brand" | "hierarchy" | "articleId") => setFilterBy(value)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brand">Brand</SelectItem>
                        <SelectItem value="hierarchy">Hierarchy</SelectItem>
                        <SelectItem value="articleId">Article IDs</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder={filterBy === "articleId" ? "Enter article IDs (comma-separated)" : `Filter by ${filterBy}...`}
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="flex-1"
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="linkedProducts"
                    render={({ field }) => (
                      <div className="max-h-[200px] overflow-y-auto border rounded-md p-4">
                        {getFilteredProducts().map((product) => (
                          <FormItem key={product.articleId} className="flex items-center space-x-2 mb-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(product.articleId)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, product.articleId]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter((id) => id !== product.articleId)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <div>
                              <div className="font-medium">{product.title}</div>
                              <div className="text-sm text-gray-500">
                                {product.articleId} - {product.brand} - {product.hierarchy}
                              </div>
                            </div>
                          </FormItem>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    {editingCampaign ? "Update Campaign" : "Create Campaign"}
                  </Button>
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
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-lg">{campaign.name}</h3>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(campaign)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
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
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Linked Products:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {campaign.linkedProducts.map((articleId) => {
                      const product = SAMPLE_PRODUCTS.find(p => p.articleId === articleId);
                      return (
                        <span
                          key={articleId}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {product?.title || articleId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
