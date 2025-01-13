import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export const Navigation = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Tabs defaultValue="market" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="market" asChild>
            <Link to="/">Аукцион</Link>
          </TabsTrigger>
          <TabsTrigger value="players" asChild>
            <Link to="/players">Предметы игроков</Link>
          </TabsTrigger>
          <TabsTrigger value="roulette" asChild>
            <Link to="/roulette">Рулетка</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Button variant="outline" className="gap-2">
        <UserCircle className="h-5 w-5" />
        Войти
      </Button>
    </div>
  );
};