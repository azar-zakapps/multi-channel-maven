import { useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";

interface Product {
  id: string;
  articleId: string;
  title: string;
  price: number;
  weeksCover: number;
  brand: string;
  hierarchy: string;
}

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

type Channel = "TikTok" | "Meta" | "TV" | "YouTube" | "Pinterest";

interface Campaign {
  id: string;
  name: string;
  channels: Channel[];
  startDate: Date;
  endDate: Date;
}

// Create sample campaigns with current dates
const today = new Date();
const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Summer Collection Launch",
    channels: ["TikTok", "Meta", "YouTube"],
    startDate: today,
    endDate: addDays(today, 5),
  },
  {
    id: "2",
    name: "Flash Sale Weekend",
    channels: ["Meta", "Pinterest"],
    startDate: addDays(today, 2),
    endDate: addDays(today, 4),
  },
  {
    id: "3",
    name: "Influencer Collaboration",
    channels: ["TikTok", "YouTube"],
    startDate: addDays(today, 1),
    endDate: addDays(today, 3),
  },
  {
    id: "4",
    name: "End of Season Sale",
    channels: ["TV", "Meta", "YouTube"],
    startDate: addDays(today, 4),
    endDate: addDays(today, 7),
  },
  {
    id: "5",
    name: "Back to School Special",
    channels: ["Pinterest", "Meta", "TikTok"],
    startDate: addDays(today, 3),
    endDate: addDays(today, 6),
  },
];

export const ProductTimelineView = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedCampaigns, setSelectedCampaigns] = useState<Campaign[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Generate array of 7 days starting from startDate
  const dateRange = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const getCampaignsForDate = (date: Date): Campaign[] => {
    return SAMPLE_CAMPAIGNS.filter(
      (campaign) =>
        date >= campaign.startDate && date <= campaign.endDate
    );
  };

  const handleDateClick = (date: Date) => {
    const campaigns = getCampaignsForDate(date);
    if (campaigns.length > 0) {
      setSelectedCampaigns(campaigns);
      setDialogOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Product Timeline</h1>
        <p className="text-gray-500 mt-1">View campaign schedules for your products</p>
      </div>

      <div className="flex items-center gap-4">
        <CalendarIcon className="w-5 h-5 text-gray-500" />
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={(date) => date && setStartDate(date)}
          className="border rounded-md"
        />
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Article ID</TableHead>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[100px]">Price (GBP)</TableHead>
              <TableHead className="w-[100px]">Weeks Cover</TableHead>
              <TableHead className="w-[150px]">Brand</TableHead>
              <TableHead className="w-[250px]">Hierarchy</TableHead>
              {dateRange.map((date) => (
                <TableHead key={date.toISOString()} className="text-center min-w-[100px]">
                  {format(date, "MMM d")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {SAMPLE_PRODUCTS.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.articleId}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>£{product.price.toFixed(2)}</TableCell>
                <TableCell>{product.weeksCover.toFixed(1)}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell className="text-sm text-gray-600">{product.hierarchy}</TableCell>
                {dateRange.map((date) => {
                  const campaigns = getCampaignsForDate(date);
                  return (
                    <TableCell key={date.toISOString()} className="text-center">
                      {campaigns.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDateClick(date)}
                        >
                          {campaigns.length}
                        </Button>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Campaigns</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedCampaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <h3 className="font-medium">{campaign.name}</h3>
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
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
