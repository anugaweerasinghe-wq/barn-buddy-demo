import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingDown, Users, Target, Award, Zap, DollarSign, Package, BarChart } from "lucide-react";
import missionHeroImg from "@/assets/mission-hero.jpg";
import cropWastageImg from "@/assets/crop-wastage.jpg";
import digitalFarmingImg from "@/assets/digital-farming.jpg";
import supplyChainImg from "@/assets/supply-chain.jpg";
import happyFarmersImg from "@/assets/happy-farmers.jpg";
import coldStorageImg from "@/assets/cold-storage.jpg";
import marketAccessImg from "@/assets/market-access.jpg";
import dataAnalyticsImg from "@/assets/data-analytics.jpg";

const Mission = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${missionHeroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20" />
        
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Reducing Crop Wastage Worth
            </p>
            <div className="text-6xl md:text-8xl font-bold text-primary mb-8 animate-fade-in">
              LKR 20 Billion
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Annually in Sri Lanka through innovative technology and sustainable farming practices
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant hover:shadow-premium transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">30%</h3>
            <p className="text-muted-foreground">Reduction in Post-Harvest Losses</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant hover:shadow-premium transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">10,000+</h3>
            <p className="text-muted-foreground">Farmers Empowered</p>
          </div>
          
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elegant hover:shadow-premium transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-2">100%</h3>
            <p className="text-muted-foreground">Commitment to Sustainability</p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 md:order-1">
              <div className="bg-card/50 backdrop-blur rounded-3xl p-8 md:p-12 border border-border shadow-premium">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-destructive" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">The Challenge</h2>
                </div>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Sri Lanka faces a critical challenge in agricultural sustainability. Every year, crops worth 
                    <span className="text-primary font-semibold"> LKR 20 Billion</span> are lost due to:
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Poor post-harvest management and storage facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Inefficient supply chain and logistics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Lack of market information and price transparency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Limited access to modern farming technology</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent rounded-3xl blur-2xl" />
              <img 
                src={cropWastageImg} 
                alt="Crop wastage problem" 
                className="relative rounded-3xl shadow-2xl border-4 border-background/50 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          {/* Supporting Images Row */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img 
                src={digitalFarmingImg} 
                alt="Digital farming technology" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <p className="text-foreground font-semibold">Modern Technology Adoption</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl group">
              <img 
                src={supplyChainImg} 
                alt="Supply chain efficiency" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                <p className="text-foreground font-semibold">Efficient Logistics Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-12 border border-primary/20 shadow-premium">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Solution</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                <img 
                  src={coldStorageImg} 
                  alt="Cold storage facility" 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent flex items-end p-6">
                  <div>
                    <Zap className="w-6 h-6 text-primary mb-2" />
                    <h3 className="text-xl font-semibold text-foreground mb-1">Smart Inventory Management</h3>
                    <p className="text-sm text-muted-foreground">Real-time tracking to minimize spoilage</p>
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                <img 
                  src={marketAccessImg} 
                  alt="Market access" 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent flex items-end p-6">
                  <div>
                    <Users className="w-6 h-6 text-primary mb-2" />
                    <h3 className="text-xl font-semibold text-foreground mb-1">Direct Market Access</h3>
                    <p className="text-sm text-muted-foreground">Connect farmers directly with buyers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Price Transparency</h3>
                    <p className="text-muted-foreground">
                      Real-time market prices help farmers make informed decisions about when to sell
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary">Data-Driven Insights</h3>
                    <p className="text-muted-foreground">
                      Analytics and reports to optimize harvest timing and storage strategies
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Analytics Image */}
            <div className="mt-8 relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={dataAnalyticsImg} 
                alt="Data analytics" 
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end p-8">
                <div className="max-w-2xl">
                  <Package className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Advanced Analytics Platform</h3>
                  <p className="text-muted-foreground">
                    Harness the power of data to predict market trends, optimize yields, and reduce waste across the entire supply chain
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Vision */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Vision for Impact</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl" />
              <img 
                src={happyFarmersImg} 
                alt="Happy farmers with successful harvest" 
                className="relative rounded-3xl shadow-2xl border-4 border-background/50 hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-premium">
              <p className="text-lg text-muted-foreground mb-6">
                By 2030, we aim to reduce post-harvest losses by 50%, ensuring that more farmers can 
                earn fair prices for their produce while contributing to food security in Sri Lanka.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Empowering Communities</h4>
                    <p className="text-sm text-muted-foreground">Supporting 10,000+ farming families across Sri Lanka</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Sustainable Growth</h4>
                    <p className="text-sm text-muted-foreground">Reducing environmental impact through efficient resource utilization</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate("/")}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                Join Our Mission
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;