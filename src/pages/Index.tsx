import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import heroImage from "@/assets/hero-modern-farm.jpg";
import freshProduceImg from "@/assets/fresh-produce.jpg";
import farmerTechImg from "@/assets/farmer-tech.jpg";
import logisticsImg from "@/assets/logistics.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

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
  const navigate = useNavigate();
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
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 shadow-lg">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Smart Farming Platform</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Barn Buddy
                </h1>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Smart Farming Made Simple
                </p>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Reducing Rs. 20 billion in annual crop waste through digital coordination. Join 250+ farmers transforming Sri Lankan agriculture.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  onClick={() => navigate("/auth")}
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Fair & Fixed Pricing
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full shadow-lg shadow-primary/30 mb-4" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Protected pricing that puts farmers first
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="relative order-2 md:order-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl" />
                <img 
                  src={farmerTechImg} 
                  alt="Farmer using technology" 
                  className="relative rounded-3xl shadow-2xl border-4 border-background/50 hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="space-y-6 order-1 md:order-2">
                <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shrink-0">
                      <Sprout className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Price Protection</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We buy your produce directly at a fixed, fair price, protecting you from market fluctuations. Even if prices rise to Rs. 400+ or Rs. 1000+, you receive the agreed fixed value.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shrink-0">
                      <BarChart3 className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Smart Tracking</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Track your harvested quantities and remaining crop in real-time. Our system helps you plan better and coordinate efficiently.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shrink-0">
                      <TrendingUp className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Reduce Wastage</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Better planning and coordination across Sri Lanka means less waste. Join us in reducing Rs. 20 billion in annual crop waste.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
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
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--primary)/0.05),transparent_60%)]" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full shadow-lg shadow-primary/30 mb-4" />
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                Three simple steps to transform your farming experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection Lines */}
              <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className="relative p-8 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm shadow-2xl border-primary/20 hover:shadow-[0_20px_60px_hsl(var(--primary)/0.2)] transition-all duration-500 hover:-translate-y-2 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                  
                  <div className="relative text-center space-y-5">
                    <div className="relative mx-auto w-fit">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                        <step.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg">
                      {index + 1}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <img 
                src={logisticsImg} 
                alt="Logistics" 
                className="rounded-3xl shadow-2xl border-4 border-background/50 mx-auto max-w-3xl w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="relative overflow-hidden p-12 md:p-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/30 shadow-[0_20px_80px_hsl(var(--primary)/0.3)]">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Our Impact
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full shadow-lg shadow-primary/30 mb-4" />
                <p className="text-xl text-muted-foreground">
                  Making a measurable difference in Sri Lankan agriculture
                </p>
              </div>
              
              <div className="relative grid md:grid-cols-3 gap-12">
                <div className="text-center space-y-4 group">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                    <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                      250+
                    </div>
                  </div>
                  <p className="text-lg text-foreground font-semibold">Farmers Supported</p>
                  <p className="text-sm text-muted-foreground">Growing community</p>
                </div>
                
                <div className="text-center space-y-4 group">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                    <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                      5
                    </div>
                  </div>
                  <p className="text-lg text-foreground font-semibold">Crops Managed</p>
                  <p className="text-sm text-muted-foreground">Diverse portfolio</p>
                </div>
                
                <div className="text-center space-y-4 group">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                    <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                      2%
                    </div>
                  </div>
                  <p className="text-lg text-foreground font-semibold">Wastage Reduced</p>
                  <p className="text-sm text-muted-foreground">Saving Rs. 20B annually</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
        
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Community
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full shadow-lg shadow-primary/30 mb-4" />
            <p className="text-xl text-muted-foreground">
              See farmers transforming agriculture across Sri Lanka
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {[
                { img: gallery1, title: "Fresh Harvest", desc: "Quality produce from our farmers" },
                { img: gallery2, title: "Sorting & Packing", desc: "Efficient processing systems" },
                { img: gallery3, title: "Farmer Community", desc: "Working together for success" },
                { img: gallery4, title: "Modern Technology", desc: "Digital farming solutions" },
                { img: gallery5, title: "Sri Lankan Fields", desc: "Beautiful agricultural landscapes" },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="min-w-[350px] md:min-w-[450px] snap-center group"
                >
                  <Card className="overflow-hidden border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-[300px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img 
                        src={item.img} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 bg-gradient-to-br from-card to-card/80">
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Scroll to explore more →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 bg-gradient-to-b from-secondary/30 to-secondary/50 border-t border-primary/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.05),transparent_50%)]" />
        
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">Barn Buddy</span>
            </div>
            <p className="text-muted-foreground text-center max-w-md">
              © 2025 Barn Buddy. Empowering farmers, reducing waste, transforming agriculture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
