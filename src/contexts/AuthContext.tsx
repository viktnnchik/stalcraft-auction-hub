import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider: Checking session...");
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("AuthProvider: Session check complete", session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("AuthProvider: Auth state changed", _event, session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("AuthProvider: Attempting sign in...");
      const { error, data } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
      });
      
      if (error) throw error;
      
      console.log("AuthProvider: Sign in successful", data);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать!",
      });
    } catch (error: any) {
      console.error("AuthProvider: Sign in error", error);
      toast({
        title: "Ошибка входа",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log("AuthProvider: Attempting sign up...");
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}`,
          data: {
            role: 'user'
          }
        }
      });

      if (error) throw error;

      // Автоматически входим после регистрации
      if (data.user) {
        console.log("AuthProvider: Sign up successful, attempting automatic sign in...");
        await signIn(email, password);
      }

      console.log("AuthProvider: Sign up and auto-login complete", data);
      toast({
        title: "Регистрация успешна",
        description: "Вы успешно зарегистрировались и вошли в систему",
      });
    } catch (error: any) {
      console.error("AuthProvider: Sign up error", error);
      toast({
        title: "Ошибка регистрации",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("AuthProvider: Attempting sign out...");
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log("AuthProvider: Sign out successful");
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы.",
      });
    } catch (error: any) {
      console.error("AuthProvider: Sign out error", error);
      toast({
        title: "Ошибка выхода",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};