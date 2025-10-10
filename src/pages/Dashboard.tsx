import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Sprout, 
  TrendingUp, 
  LogOut,
  User,
  Apple,
  Carrot,
  CheckCircle2
} from "lucide-react";

interface Profile {
  name: string;
  farm_name: string | null;
  farm_location: string | null;
}

type Category = "fruits" | "vegetables" | null;

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [fruitsAmount, setFruitsAmount] = useState("");
  const [vegetablesAmount, setVegetablesAmount] = useState("");
  const [fruitsTons, setFruitsTons] = useState(0);
  const [vegetablesTons, setVegetablesTons] = useState(0);
  const [showFruitsToast, setShowFruitsToast] = useState(false);
  const [showVegetablesToast, setShowVegetablesToast] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;
      setProfile(profileData);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleUpdateFruits = () => {
    const amount = parseFloat(fruitsAmount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount.",
      });
      return;
    }

    setFruitsTons(prev => prev + amount);
    setFruitsAmount("");
    
    toast({
      title: "Fruits updated!",
      description: `Successfully added ${amount} tons of fruits.`,
    });

    setShowFruitsToast(true);
    setTimeout(() => setShowFruitsToast(false), 2000);
  };

  const handleUpdateVegetables = () => {
    const amount = parseFloat(vegetablesAmount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount.",
      });
      return;
    }

    setVegetablesTons(prev => prev + amount);
    setVegetablesAmount("");
    
    toast({
      title: "Vegetables updated!",
      description: `Successfully added ${amount} tons of vegetables.`,
    });

    setShowVegetablesToast(true);
    setTimeout(() => setShowVegetablesToast(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Barn Buddy</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{profile?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2 animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground">
                Welcome, {profile?.name}! 👋
              </h2>
              <p className="text-muted-foreground text-lg">
                Choose what you want to track
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border hover:border-primary/50"
                onClick={() => setSelectedCategory("fruits")}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Apple className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Fruits</h3>
                  <p className="text-muted-foreground">Track your fruit cultivation</p>
                  {fruitsTons > 0 && (
                    <p className="text-sm font-semibold text-primary">
                      Total: {fruitsTons} tons
                    </p>
                  )}
                </div>
              </Card>

              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border hover:border-primary/50"
                onClick={() => setSelectedCategory("vegetables")}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Carrot className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Vegetables</h3>
                  <p className="text-muted-foreground">Track your vegetable cultivation</p>
                  {vegetablesTons > 0 && (
                    <p className="text-sm font-semibold text-primary">
                      Total: {vegetablesTons} tons
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Barn Buddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">{profile?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            {selectedCategory === "fruits" ? (
              <>
                <Apple className="w-8 h-8 text-primary" />
                Fruits Cultivation
              </>
            ) : (
              <>
                <Carrot className="w-8 h-8 text-primary" />
                Vegetables Cultivation
              </>
            )}
          </h2>
          <Button 
            variant="outline"
            onClick={() => setSelectedCategory(null)}
          >
            Back to Categories
          </Button>
        </div>

        <Card className="p-8 max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-foreground">
                Total {selectedCategory === "fruits" ? "Fruits" : "Vegetables"} Cultivated
              </h3>
              <p className="text-5xl font-bold text-primary">
                {selectedCategory === "fruits" ? fruitsTons : vegetablesTons} tons
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Enter the amount you cultivated (tons):
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Enter amount (tons)"
                    value={selectedCategory === "fruits" ? fruitsAmount : vegetablesAmount}
                    onChange={(e) => 
                      selectedCategory === "fruits" 
                        ? setFruitsAmount(e.target.value)
                        : setVegetablesAmount(e.target.value)
                    }
                    className="w-full"
                    min="0"
                    step="0.1"
                  />
                </div>
                <Button 
                  onClick={selectedCategory === "fruits" ? handleUpdateFruits : handleUpdateVegetables}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={
                    selectedCategory === "fruits"
                      ? !fruitsAmount || parseFloat(fruitsAmount) <= 0
                      : !vegetablesAmount || parseFloat(vegetablesAmount) <= 0
                  }
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Update Amount
                </Button>
              </div>
            </div>

            {((selectedCategory === "fruits" && showFruitsToast) || 
              (selectedCategory === "vegetables" && showVegetablesToast)) && (
              <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Data updated successfully!
                </span>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
