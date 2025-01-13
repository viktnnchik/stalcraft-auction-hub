import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ItemCard } from "@/components/ItemCard";
import { Search } from "lucide-react";
import { Navigation } from "@/components/Navigation";

// Расширенный список предметов
const MOCK_ITEMS = [
  {
    id: "1",
    name: "Экзоскелет «Заря»",
    image: "https://static.wikia.nocookie.net/stalcraft/images/5/51/Заря.png",
    currentPrice: 15000,
    timeLeft: "2ч 15м",
  },
  {
    id: "2",
    name: "ПДА военного",
    image: "https://static.wikia.nocookie.net/stalcraft/images/b/b1/ПДА_военного.png",
    currentPrice: 8000,
    timeLeft: "45м",
  },
  {
    id: "3",
    name: "Артефакт «Медуза»",
    image: "https://static.wikia.nocookie.net/stalcraft/images/0/0d/Медуза.png",
    currentPrice: 25000,
    timeLeft: "12ч",
  },
  {
    id: "4",
    name: "СВДМ",
    image: "https://static.wikia.nocookie.net/stalcraft/images/4/42/СВДМ.png",
    currentPrice: 45000,
    timeLeft: "5ч 30м",
  },
  {
    id: "5",
    name: "Бронежилет «Берилл-5М»",
    image: "https://static.wikia.nocookie.net/stalcraft/images/f/f4/Берилл-5М.png",
    currentPrice: 32000,
    timeLeft: "8ч 45м",
  },
  {
    id: "6",
    name: "Артефакт «Грави»",
    image: "https://static.wikia.nocookie.net/stalcraft/images/b/b0/Грави.png",
    currentPrice: 28000,
    timeLeft: "1ч 20м",
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">STALCRAFT Аукцион</h1>
        
        <Navigation />
        
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