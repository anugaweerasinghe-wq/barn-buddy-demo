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
      title: "Amount updated!",
      description: `Successfully added ${amount} tons of ${selectedItem.name}.`,
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
                onClick={() => {
                  setSelectedCategory("fruits");
                  setSelectedItem(fruits[0]);
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Apple className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Fruits</h3>
                  <p className="text-muted-foreground">Track your fruit cultivation</p>
                  {getTotalAmount() > 0 && selectedCategory === "fruits" && (
                    <p className="text-sm font-semibold text-primary">
                      Total: {getTotalAmount()} tons
                    </p>
                  )}
                </div>
              </Card>

              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-card border-border hover:border-primary/50"
                onClick={() => {
                  setSelectedCategory("vegetables");
                  setSelectedItem(vegetables[0]);
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Carrot className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Vegetables</h3>
                  <p className="text-muted-foreground">Track your vegetable cultivation</p>
                  {getTotalAmount() > 0 && selectedCategory === "vegetables" && (
                    <p className="text-sm font-semibold text-primary">
                      Total: {getTotalAmount()} tons
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
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
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
            <Button 
              variant="outline"
              onClick={() => {
                setSelectedCategory(null);
                setSelectedItem(null);
              }}
            >
              Back to Categories
            </Button>
          </div>

          {/* Main Tracker Card */}
          {selectedItem && (
            <Card className="p-8 bg-card shadow-xl border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <span className="text-3xl">{selectedItem.icon}</span>
                    {selectedItem.name}
                  </h3>
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedItem.amount} tons cultivated
                  </span>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="text-sm text-muted-foreground">
                    Total cultivated: <span className="font-semibold text-primary text-lg">
                      {selectedItem.amount} tons
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter amount (tons)"
                        value={inputAmount}
                        onChange={(e) => setInputAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <Button 
                      onClick={handleUpdateAmount}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Update Amount
                    </Button>
                  </div>
                </div>

                {showUpdateToast && (
                  <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Amount updated successfully!
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Selection Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Select {selectedCategory}:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(selectedCategory === "fruits" ? fruits : vegetables).map((item) => (
                <Card
                  key={item.name}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedItem?.name === item.name
                      ? "bg-primary/10 border-primary shadow-lg"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{item.icon}</div>
                    <p className="font-medium text-foreground text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.amount}t
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Total Summary */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Total {selectedCategory === "fruits" ? "Fruits" : "Vegetables"} Cultivated
              </p>
              <p className="text-4xl font-bold text-primary">
                {getTotalAmount()} tons
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
