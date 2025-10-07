import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Sprout, 
  TrendingUp, 
  Users, 
  Package, 
  CheckCircle2,
  ArrowRight,
  Leaf,
  BarChart3
} from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const crops = [
  { name: "Carrot", icon: "🥕", harvested: 90, total: 100 },
  { name: "Tomato", icon: "🍅", harvested: 75, total: 80 },
  { name: "Potato", icon: "🥔", harvested: 120, total: 150 },
  { name: "Leek", icon: "🧅", harvested: 45, total: 60 },
  { name: "Cabbage", icon: "🥬", harvested: 85, total: 100 },
];

const steps = [
  {
    icon: Users,
    title: "Farmers Register",
    description: "Farmers register and enter harvest data through our mobile app",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "System tracks total crop demand and updates progress in real-time",
  },
  {
    icon: Package,
    title: "Efficient Transport",
    description: "Crops transported to retailers efficiently via trains and logistics",
  },
];

const Index = () => {
  const [cropsData, setCropsData] = useState(crops);
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [harvestInput, setHarvestInput] = useState("");
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  const handleUpdateHarvest = () => {
    const amount = parseFloat(harvestInput);
    if (!amount || amount <= 0 || isNaN(amount)) {
      return;
    }

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
    setShowUpdateToast(true);
    setTimeout(() => setShowUpdateToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 backdrop-blur-sm border border-primary/20 mb-4">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Smart Farming Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Barn Buddy
            </h1>
            <p className="text-2xl md:text-3xl text-primary font-semibold">
              Smart Farming Made Simple
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Reducing Rs. 20 billion in annual crop waste through digital coordination
            </p>
            
            <Button 
              size="lg" 
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                About Barn Buddy
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            </div>
            
            <Card className="p-8 bg-card shadow-lg border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Sprout className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-lg text-foreground leading-relaxed">
                    Barn Buddy is a platform designed to simplify how farmers manage their harvests. 
                    We buy your produce directly at a fixed, fair price, protecting you from market 
                    fluctuations—so even if prices rise to Rs. 400+ or Rs. 1000+, you still receive 
                    the agreed fixed value. Our system also helps you track your harvested quantities 
                    and remaining crop, ensuring better planning and coordination while reducing wastage.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Live Demo
              </h2>
              <p className="text-muted-foreground text-lg">
                See how farmers track and manage their harvests
              </p>
            </div>

            {/* Main Progress Tracker */}
            <Card className="p-8 mb-8 bg-card shadow-xl border-border">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <span className="text-3xl">{selectedCrop.icon}</span>
                    {selectedCrop.name}
                  </h3>
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedCrop.harvested} / {selectedCrop.total} tons harvested
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

                {showUpdateToast && (
                  <div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-lg animate-fade-in">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Harvest data updated successfully!
                    </span>
                  </div>
                )}
              </div>
            </Card>

            {/* Crop Selection Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {cropsData.map((crop) => (
                <Card
                  key={crop.name}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedCrop.name === crop.name
                      ? "bg-primary/10 border-primary shadow-lg"
                      : "bg-card border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedCrop(crop)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-4xl">{crop.icon}</div>
                    <p className="font-medium text-foreground text-sm">{crop.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {crop.harvested}/{crop.total}t
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Three simple steps to smarter farming
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className="p-8 bg-card shadow-lg border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="w-8 h-8 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Our Impact
                </h2>
                <p className="text-muted-foreground">
                  Making a difference in Sri Lankan agriculture
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">250+</div>
                  <p className="text-foreground font-medium">Farmers Supported</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">5</div>
                  <p className="text-foreground font-medium">Crops Managed</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">2%</div>
                  <p className="text-foreground font-medium">Wastage Reduced</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Barn Buddy. Empowering farmers, reducing waste.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
