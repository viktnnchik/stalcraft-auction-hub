import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ItemCard } from "@/components/ItemCard";
import { Search } from "lucide-react";

// Временные данные для демонстрации
const MOCK_ITEMS = [
  {
    id: "1",
    name: "Экзоскелет «Заря»",
    image: "/placeholder.svg",
    currentPrice: 15000,
    timeLeft: "2ч 15м",
  },
  {
    id: "2",
    name: "ПДА военного",
    image: "/placeholder.svg",
    currentPrice: 8000,
    timeLeft: "45м",
  },
  {
    id: "3",
    name: "Артефакт «Медуза»",
    image: "/placeholder.svg",
    currentPrice: 25000,
    timeLeft: "12ч",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">STALCRAFT Аукцион</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Поиск предметов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_ITEMS.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;