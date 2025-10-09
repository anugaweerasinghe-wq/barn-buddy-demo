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
  User
} from "lucide-react";

interface Profile {
  name: string;
  farm_name: string | null;
  farm_location: string | null;
}

interface Crop {
  name: string;
  icon: any;
  harvested: number;
  total: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [cropsData, setCropsData] = useState<Crop[]>([
    { name: "Potatoes", icon: "🥔", harvested: 120, total: 150 },
    { name: "Tomatoes", icon: "🍅", harvested: 80, total: 100 },
    { name: "Carrots", icon: "🥕", harvested: 45, total: 80 },
    { name: "Cabbage", icon: "🥬", harvested: 30, total: 60 },
    { name: "Onions", icon: "🧅", harvested: 55, total: 70 },
  ]);
  
  const [selectedCrop, setSelectedCrop] = useState(cropsData[0]);
  const [harvestInput, setHarvestInput] = useState("");

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

  const handleUpdateHarvest = async () => {
    const amount = parseFloat(harvestInput);
    if (!amount || amount <= 0 || isNaN(amount)) {
      return;
    }

    try {
      const updatedCrops = cropsData.map(crop => {
        if (crop.name === selectedCrop.name) {
          const newHarvested = Math.min(crop.harvested + amount, crop.total);
          return { ...crop, harvested: newHarvested };
        }
        return crop;
      });

      setCropsData(updatedCrops);
      const updatedSelected = updatedCrops.find(c => c.name === selectedCrop.name);
      if (updatedSelected) {
        setSelectedCrop(updatedSelected);
      }
      setHarvestInput("");
      
      toast({
        title: "Harvest Updated!",
        description: `Added ${amount} tons to ${selectedCrop.name}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.name}!
          </h2>
          {profile?.farm_name && (
            <p className="text-muted-foreground">
              {profile.farm_name} {profile.farm_location && `• ${profile.farm_location}`}
            </p>
          )}
        </div>

        {/* Harvest Tracker */}
        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Harvest Progress Tracker
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{selectedCrop.icon}</span>
                <span className="text-lg font-semibold text-foreground">
                  {selectedCrop.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedCrop.harvested} / {selectedCrop.total} tons
                </span>
              </div>
              
              <Progress
                value={(selectedCrop.harvested / selectedCrop.total) * 100}
                className="h-4"
              />
              
              <div className="space-y-4 pt-4">
                <div className="text-sm text-muted-foreground">
                  Progress: <span className="font-semibold text-primary">
                    {Math.round((selectedCrop.harvested / selectedCrop.total) * 100)}%
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter harvest amount (tons)"
                      value={harvestInput}
                      onChange={(e) => setHarvestInput(e.target.value)}
                      className="w-full"
                      min="0"
                      step="0.1"
                    />
                  </div>
                  <Button 
                    onClick={handleUpdateHarvest}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={!harvestInput || parseFloat(harvestInput) <= 0}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Update Harvest
                  </Button>
                </div>
              </div>
            </div>

            {/* Crop Selection Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
              {cropsData.map((crop) => (
                <Card
                  key={crop.name}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedCrop.name === crop.name
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{crop.icon}</div>
                    <p className="text-sm font-medium text-foreground">
                      {crop.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((crop.harvested / crop.total) * 100)}%
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
