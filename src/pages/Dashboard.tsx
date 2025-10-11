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

interface Item {
  name: string;
  icon: string;
  amount: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  
  // Top 5 most wasted fruits in Sri Lanka
  const [fruits, setFruits] = useState<Item[]>([
    { name: "Mango", icon: "🥭", amount: 0 },
    { name: "Banana", icon: "🍌", amount: 0 },
    { name: "Papaya", icon: "🍈", amount: 0 },
    { name: "Pineapple", icon: "🍍", amount: 0 },
    { name: "Watermelon", icon: "🍉", amount: 0 },
  ]);

  // Top 5 most wasted vegetables in Sri Lanka
  const [vegetables, setVegetables] = useState<Item[]>([
    { name: "Tomato", icon: "🍅", amount: 0 },
    { name: "Cabbage", icon: "🥬", amount: 0 },
    { name: "Carrot", icon: "🥕", amount: 0 },
    { name: "Beans", icon: "🫘", amount: 0 },
    { name: "Leeks", icon: "🧅", amount: 0 },
  ]);

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [inputAmount, setInputAmount] = useState("");
  const [showUpdateToast, setShowUpdateToast] = useState(false);

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

  const handleUpdateAmount = () => {
    const amount = parseFloat(inputAmount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid amount.",
      });
      return;
    }

    if (!selectedItem) return;

    if (selectedCategory === "fruits") {
      setFruits(prev => prev.map(item => 
        item.name === selectedItem.name 
          ? { ...item, amount: item.amount + amount }
          : item
      ));
      const updatedItem = fruits.find(f => f.name === selectedItem.name);
      if (updatedItem) {
        setSelectedItem({ ...updatedItem, amount: updatedItem.amount + amount });
      }
    } else if (selectedCategory === "vegetables") {
      setVegetables(prev => prev.map(item => 
        item.name === selectedItem.name 
          ? { ...item, amount: item.amount + amount }
          : item
      ));
      const updatedItem = vegetables.find(v => v.name === selectedItem.name);
      if (updatedItem) {
        setSelectedItem({ ...updatedItem, amount: updatedItem.amount + amount });
      }
    }

    setInputAmount("");
    
    toast({
      title: "Land area updated!",
      description: `Successfully added ${amount} acres for ${selectedItem.name}.`,
    });

    setShowUpdateToast(true);
    setTimeout(() => setShowUpdateToast(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdateAmount();
    }
  };

  const getTotalAmount = () => {
    const items = selectedCategory === "fruits" ? fruits : vegetables;
    return items.reduce((sum, item) => sum + item.amount, 0);
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
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Barn Buddy</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{profile?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-block p-4 rounded-2xl bg-primary/10 mb-4">
                <Sprout className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h2 className="text-5xl font-bold text-foreground">
                Welcome, {profile?.name}! 🌾
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Track your farm's cultivation area and maximize your harvest potential
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <Card 
                className="group p-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-card to-primary/5 border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden relative"
                onClick={() => {
                  setSelectedCategory("fruits");
                  setSelectedItem(fruits[0]);
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
                <div className="relative text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Apple className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">Fruits</h3>
                    <p className="text-muted-foreground text-lg">Track your fruit orchards and cultivation area</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">Click to start tracking</p>
                  </div>
                </div>
              </Card>

              <Card 
                className="group p-10 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-card to-primary/5 border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden relative"
                onClick={() => {
                  setSelectedCategory("vegetables");
                  setSelectedItem(vegetables[0]);
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
                <div className="relative text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Carrot className="w-12 h-12 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">Vegetables</h3>
                    <p className="text-muted-foreground text-lg">Track your vegetable fields and cultivation area</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">Click to start tracking</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">5+</div>
                <p className="text-sm text-muted-foreground">Crop Categories</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">∞</div>
                <p className="text-sm text-muted-foreground">Unlimited Tracking</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-primary">📊</div>
                <p className="text-sm text-muted-foreground">Real-time Insights</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Barn Buddy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/50">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{profile?.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-full">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
                {selectedCategory === "fruits" ? (
                  <>
                    <Apple className="w-8 h-8 text-primary" />
                    Top 5 Most Wasted Fruits in Sri Lanka
                  </>
                ) : (
                  <>
                    <Carrot className="w-8 h-8 text-primary" />
                    Top 5 Most Wasted Vegetables in Sri Lanka
                  </>
                )}
              </h2>
              <p className="text-muted-foreground">Optimize your cultivation by tracking land area</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedItem(null);
              }}
              className="rounded-full"
            >
              Back to Categories
            </Button>
          </div>

          {/* Main Tracker Card */}
          {selectedItem && (
            <Card className="p-8 bg-gradient-to-br from-card to-primary/5 shadow-2xl border-2 border-primary/20 rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-4xl">{selectedItem.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{selectedItem.name}</h3>
                      <p className="text-sm text-muted-foreground">Track your cultivation area</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Land Area</p>
                    <p className="text-3xl font-bold text-primary">{selectedItem.amount} acres</p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter land area (acres)"
                        value={inputAmount}
                        onChange={(e) => setInputAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full h-12 text-lg rounded-xl"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <Button 
                      onClick={handleUpdateAmount}
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground h-12 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Add Land Area
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Press Enter to quickly add land area</p>
                </div>

                {showUpdateToast && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-xl animate-fade-in">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Land area updated successfully!
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Selection Cards */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">
                Select your {selectedCategory}:
              </h3>
              <p className="text-sm text-muted-foreground">Click any crop to track</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(selectedCategory === "fruits" ? fruits : vegetables).map((item) => (
                <Card
                  key={item.name}
                  className={`group p-6 cursor-pointer transition-all duration-300 hover:scale-110 rounded-2xl ${
                    selectedItem?.name === item.name
                      ? "bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary shadow-xl"
                      : "bg-card border-2 border-border hover:border-primary/50 hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="text-center space-y-3">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">Land Area</p>
                      <p className="text-lg font-bold text-primary">{item.amount}<span className="text-sm"> acres</span></p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 border-2 border-primary/30 rounded-2xl shadow-xl">
            <div className="text-center space-y-4">
              <div className="inline-block p-3 rounded-full bg-primary/20">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                  Total {selectedCategory === "fruits" ? "Fruit" : "Vegetable"} Cultivation Area
                </p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {getTotalAmount()} acres
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Track and optimize your farm's land utilization for better harvest planning
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
