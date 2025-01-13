import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Bid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
}

interface BidHistoryProps {
  bids: Bid[];
}

export const BidHistory = ({ bids }: BidHistoryProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">История ставок</h3>
      <ScrollArea className="h-[200px]">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="flex justify-between items-center py-2 border-b border-border last:border-0"
          >
            <div>
              <span className="text-sm text-muted-foreground">{bid.bidder}</span>
              <p className="font-medium">{bid.amount} ₽</p>
            </div>
            <span className="text-sm text-muted-foreground">{bid.timestamp}</span>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};