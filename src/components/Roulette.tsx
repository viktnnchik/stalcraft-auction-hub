import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

interface RouletteItem {
  id: number;
  name: string;
  rarity: string;
  image: string;
  price: number;
}

const DEMO_ITEMS: RouletteItem[] = [
  { id: 1, name: "AK-47 | Азимов", rarity: "Тайное", image: "/placeholder.svg", price: 15000 },
  { id: 2, name: "M4A4 | Вой", rarity: "Засекреченное", image: "/placeholder.svg", price: 8000 },
  { id: 3, name: "AWP | Асимов", rarity: "Тайное", image: "/placeholder.svg", price: 12000 },
  { id: 4, name: "Desert Eagle | Пламя", rarity: "Тайное", image: "/placeholder.svg", price: 5000 },
  { id: 5, name: "Керамбит | Градиент", rarity: "Тайное", image: "/placeholder.svg", price: 25000 },
];

export const Roulette = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [position, setPosition] = useState(0);
  const { toast } = useToast();

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spins = 5; // Количество полных оборотов
    const itemWidth = 200; // Ширина каждого элемента в пикселях
    const items = DEMO_ITEMS.length;
    const totalWidth = items * itemWidth;
    
    // Случайная позиция для остановки
    const randomItem = Math.floor(Math.random() * items);
    const targetPosition = (spins * totalWidth) + (randomItem * itemWidth);
    
    // Анимация вращения
    setPosition(targetPosition);
    
    // Показываем результат через 5 секунд
    setTimeout(() => {
      setIsSpinning(false);
      toast({
        title: "Поздравляем!",
        description: `Вы выиграли: ${DEMO_ITEMS[randomItem].name}`,
      });
    }, 5000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Рулетка</h2>
        
        <div className="flex items-center gap-4">
          <span className="text-sm">Ставка:</span>
          <Slider
            value={[selectedAmount]}
            onValueChange={(value) => setSelectedAmount(value[0])}
            max={10000}
            step={100}
            className="w-64"
          />
          <span className="text-sm font-medium">{selectedAmount} ₽</span>
        </div>

        <Button 
          onClick={handleSpin} 
          disabled={isSpinning}
          className="w-full max-w-xs"
        >
          {isSpinning ? "Крутим..." : "Крутить"}
        </Button>
      </div>

      <div className="relative overflow-hidden border rounded-lg h-48">
        <div 
          className="flex absolute transition-transform duration-[5000ms] ease-out"
          style={{ 
            transform: `translateX(-${position}px)`,
          }}
        >
          {/* Повторяем предметы несколько раз для создания эффекта бесконечности */}
          {[...DEMO_ITEMS, ...DEMO_ITEMS, ...DEMO_ITEMS].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[200px] h-48 p-4 border-r"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-2">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="text-sm font-medium text-center">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.price} ₽</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};