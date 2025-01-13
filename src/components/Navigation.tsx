import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthForm } from "./AuthForm";

export const Navigation = () => {
  const { user, signOut } = useAuth();

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
      
      {user ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button variant="outline" className="gap-2" onClick={() => signOut()}>
            <LogOut className="h-5 w-5" />
            Выйти
          </Button>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <UserCircle className="h-5 w-5" />
              Войти
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AuthForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};