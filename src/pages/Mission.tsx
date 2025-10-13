import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingDown, Users, Target, Award } from "lucide-react";

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
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur rounded-3xl p-12 border border-border shadow-premium">
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
      </section>

      {/* Our Solution */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-12 border border-primary/20 shadow-premium">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Solution</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Smart Inventory Management</h3>
                <p className="text-muted-foreground">
                  Real-time tracking of produce conditions to minimize spoilage and optimize storage
                </p>
              </div>
              
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Direct Market Access</h3>
                <p className="text-muted-foreground">
                  Connect farmers directly with buyers, eliminating middlemen and reducing waste
                </p>
              </div>
              
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Price Transparency</h3>
                <p className="text-muted-foreground">
                  Real-time market prices help farmers make informed decisions about when to sell
                </p>
              </div>
              
              <div className="bg-background/80 backdrop-blur rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-semibold mb-3 text-primary">Data-Driven Insights</h3>
                <p className="text-muted-foreground">
                  Analytics and reports to optimize harvest timing and storage strategies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Vision */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Vision for Impact</h2>
          <div className="bg-card rounded-3xl p-12 border border-border shadow-premium">
            <p className="text-lg text-muted-foreground mb-6">
              By 2030, we aim to reduce post-harvest losses by 50%, ensuring that more farmers can 
              earn fair prices for their produce while contributing to food security in Sri Lanka.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/")}
              className="bg-gradient-primary hover:opacity-90"
            >
              Join Our Mission
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;