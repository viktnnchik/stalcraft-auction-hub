import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface ItemCardProps {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  timeLeft: string;
}

export const ItemCard = ({ id, name, image, currentPrice, timeLeft }: ItemCardProps) => {
  return (
    <Link to={`/item/${id}`}>
      <Card className="item-card">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <img
            src={image}
            alt={name}
            className="item-image object-cover w-full h-full"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg truncate">{name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="glow-text">{currentPrice} ₽</span>
            <span className="text-sm text-muted-foreground">{timeLeft}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};