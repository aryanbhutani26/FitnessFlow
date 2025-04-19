import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Onboarding from "@/pages/onboarding";
import Dashboard from "@/pages/dashboard";
import Dance from "@/pages/dance";
import Nutrition from "@/pages/nutrition";
import Chatbot from "@/pages/chatbot";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import MobileNav from "./components/layout/mobile-nav";
import { useUser } from "./contexts/user-context";

function App() {
  const { user, loading } = useUser();
  
  console.log("App rendering with:", { user, loading });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-lg font-medium">Loading BeatBurn...</p>
        </div>
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 p-8 rounded-2xl text-white shadow-lg">
            <h1 className="text-4xl font-bold mb-4">BeatBurn: All-in-One Fitness App</h1>
            <p className="text-xl">Dance your way to fitness with AI-powered tracking, personalized nutrition, and more!</p>
          </div>
          
          <h2 className="text-2xl text-accent font-bold mt-10 mb-6 text-center"> Get Started With  <span className="text-primary">Beat</span> Burn</h2>
          <div className="mb-16 rounded-xl shadow-lg">
            <Onboarding />
          </div>
          
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-blue-700">2. Dashboard & Analytics</h2>
          <div className="mb-16 rounded-xl shadow-lg">
            <Dashboard />
          </div>
          
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-blue-700">3. Dance & Fitness Tracking</h2>
          <div className="mb-16 rounded-xl shadow-lg">
            <Dance />
          </div>
          
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-primary text-blue-700">4. Nutrition Planning</h2>
          <div className="mb-16 rounded-xl shadow-lg">
            <Nutrition />
          </div>
          
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-blue-700">5. AI Fitness Coach</h2>
          <div className="mb-16 rounded-xl shadow-lg">
            <Chatbot />
          </div>
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
