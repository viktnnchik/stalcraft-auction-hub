import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BidHistory } from "@/components/BidHistory";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Временные данные
const MOCK_BIDS = [
  { id: "1", bidder: "Сталкер_1", amount: 14000, timestamp: "5 минут назад" },
  { id: "2", bidder: "Зона_Охотник", amount: 13500, timestamp: "15 минут назад" },
  { id: "3", bidder: "Свобода_Боец", amount: 13000, timestamp: "30 минут назад" },
];

const ItemDetails = () => {
  const { id } = useParams();
  const [bidAmount, setBidAmount] = useState("");

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Placing bid:", bidAmount);
    // Здесь будет логика размещения ставки
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="aspect-square rounded-lg overflow-hidden mb-6">
              <img
                src="/placeholder.svg"
                alt="Экзоскелет «Заря»"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold mb-4">Экзоскелет «Заря»</h1>
            <p className="text-muted-foreground mb-6">
              Улучшенная версия стандартного экзоскелета. Обеспечивает отличную защиту и увеличивает грузоподъёмность.
            </p>
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Текущая ставка</p>
                <p className="text-2xl font-bold text-stalcraft-radiation">15,000 ₽</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Осталось времени</p>
                <p className="text-xl font-semibold">2ч 15м</p>
              </div>
            </div>

            <form onSubmit={handleBid} className="flex gap-4">
              <Input
                type="number"
                placeholder="Введите сумму ставки"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-stalcraft-radiation text-black hover:bg-stalcraft-radiation/90">
                Сделать ставку
              </Button>
            </form>
          </Card>

          <div>
            <BidHistory bids={MOCK_BIDS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;