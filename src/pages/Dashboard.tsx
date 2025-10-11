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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/20 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <header className="border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg">
                <Sprout className="w-7 h-7 text-primary-foreground drop-shadow-md" />
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
                Barn Buddy
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-secondary/80 shadow-md border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">{profile?.name}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="rounded-full border-2 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/10 to-transparent shadow-2xl border border-primary/20 mb-6">
                <Sprout className="w-20 h-20 text-primary mx-auto drop-shadow-lg" />
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-foreground leading-tight">
                Welcome, <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">{profile?.name}</span>! 🌾
              </h2>
              <p className="text-muted-foreground text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                Transform your farming with smart cultivation tracking. <br />
                <span className="text-primary font-semibold">Maximize yields, minimize waste.</span>
              </p>
            </div>

            {/* Category Cards */}
            <div className="grid md:grid-cols-2 gap-10 mt-20">
              <Card 
                className="group p-12 cursor-pointer transition-all duration-700 hover:scale-105 bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/30 hover:border-primary shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] rounded-3xl overflow-hidden relative"
                onClick={() => {
                  setSelectedCategory("fruits");
                  setSelectedItem(fruits[0]);
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:w-56 group-hover:h-56 transition-all duration-700" />
                
                <div className="relative text-center space-y-8">
                  <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <Apple className="w-16 h-16 text-primary drop-shadow-lg" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-4xl font-black text-foreground">Fruits 🍎</h3>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      Track your orchards & optimize <br />fruit cultivation areas
                    </p>
                  </div>
                  <div className="pt-6 border-t-2 border-primary/20">
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      <span>Start Tracking</span>
                      <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card 
                className="group p-12 cursor-pointer transition-all duration-700 hover:scale-105 bg-gradient-to-br from-card via-card to-accent/10 border-2 border-primary/30 hover:border-primary shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)] rounded-3xl overflow-hidden relative"
                onClick={() => {
                  setSelectedCategory("vegetables");
                  setSelectedItem(vegetables[0]);
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:w-56 group-hover:h-56 transition-all duration-700" />
                
                <div className="relative text-center space-y-8">
                  <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <Carrot className="w-16 h-16 text-primary drop-shadow-lg" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-4xl font-black text-foreground">Vegetables 🥕</h3>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                      Monitor your fields & maximize <br />vegetable cultivation
                    </p>
                  </div>
                  <div className="pt-6 border-t-2 border-primary/20">
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                      <span>Start Tracking</span>
                      <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Stats Section */}
            <div className="relative mt-20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/15 to-primary/10 rounded-3xl blur-2xl" />
              <div className="relative grid md:grid-cols-3 gap-8 p-12 bg-gradient-to-r from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-3xl border-2 border-primary/30 shadow-2xl">
                <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all duration-300">
                  <div className="text-5xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">5+</div>
                  <p className="text-base font-semibold text-muted-foreground">Top Crops Tracked</p>
                </div>
                <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all duration-300">
                  <div className="text-5xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">∞</div>
                  <p className="text-base font-semibold text-muted-foreground">Unlimited Entries</p>
                </div>
                <div className="text-center space-y-3 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all duration-300">
                  <div className="text-5xl font-black">📊</div>
                  <p className="text-base font-semibold text-muted-foreground">Live Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <header className="border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg">
              <Sprout className="w-7 h-7 text-primary-foreground drop-shadow-md" />
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent drop-shadow-sm">
              Barn Buddy
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-secondary to-secondary/80 shadow-md border border-primary/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">{profile?.name}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout} 
              className="rounded-full border-2 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-xl" />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-gradient-to-r from-card/90 via-card/95 to-card/90 backdrop-blur-xl rounded-3xl border-2 border-primary/30 shadow-2xl">
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-foreground flex items-center gap-4">
                  {selectedCategory === "fruits" ? (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg">
                        <Apple className="w-8 h-8 text-primary" />
                      </div>
                      Top 5 Most Wasted Fruits 🇱🇰
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shadow-lg">
                        <Carrot className="w-8 h-8 text-primary" />
                      </div>
                      Top 5 Most Wasted Vegetables 🇱🇰
                    </>
                  )}
                </h2>
                <p className="text-muted-foreground text-lg font-medium">
                  Optimize cultivation by tracking and reducing waste
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedItem(null);
                }}
                className="rounded-full px-6 py-6 text-base font-semibold border-2 hover:border-primary hover:bg-primary/10 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                ← Back to Categories
              </Button>
            </div>
          </div>

          {/* Main Tracker Card */}
          {selectedItem && (
            <Card className="relative p-10 bg-gradient-to-br from-card via-card/95 to-primary/10 shadow-2xl border-2 border-primary/30 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              
              <div className="relative space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-2 border-primary/20">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center shadow-xl">
                      <span className="text-5xl drop-shadow-lg">{selectedItem.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-foreground">{selectedItem.name}</h3>
                      <p className="text-base text-muted-foreground font-medium mt-1">Track cultivation area</p>
                    </div>
                  </div>
                  <div className="text-center md:text-right p-6 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30">
                    <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide mb-1">Total Land Area</p>
                    <p className="text-4xl font-black bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {selectedItem.amount} <span className="text-2xl">acres</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter land area (acres)"
                        value={inputAmount}
                        onChange={(e) => setInputAmount(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full h-14 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary shadow-md font-medium"
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <Button 
                      onClick={handleUpdateAmount}
                      className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:to-primary/70 text-primary-foreground h-14 px-10 rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                      disabled={!inputAmount || parseFloat(inputAmount) <= 0}
                    >
                      <TrendingUp className="w-6 h-6 mr-2" />
                      Add Land Area
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">💡 Pro tip: Press Enter to quickly add land area</p>
                </div>

                {showUpdateToast && (
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 border-2 border-primary/40 rounded-2xl animate-fade-in shadow-lg">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                    <span className="text-base font-bold text-foreground">
                      ✅ Land area updated successfully!
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Selection Cards */}
          <div className="space-y-8">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-black text-foreground">
                Select your {selectedCategory} 👇
              </h3>
              <p className="text-sm text-muted-foreground font-semibold">Click any crop to track</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {(selectedCategory === "fruits" ? fruits : vegetables).map((item) => (
                <Card
                  key={item.name}
                  className={`group p-8 cursor-pointer transition-all duration-500 hover:scale-110 rounded-3xl relative overflow-hidden ${
                    selectedItem?.name === item.name
                      ? "bg-gradient-to-br from-primary/25 via-primary/15 to-primary/10 border-2 border-primary shadow-2xl ring-4 ring-primary/20"
                      : "bg-gradient-to-br from-card to-card/90 border-2 border-primary/20 hover:border-primary hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  {selectedItem?.name === item.name && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div className="text-center space-y-4">
                    <div className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 drop-shadow-lg">{item.icon}</div>
                    <p className="font-bold text-foreground text-lg">{item.name}</p>
                    <div className="pt-3 border-t-2 border-primary/20">
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-1">Land Area</p>
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
