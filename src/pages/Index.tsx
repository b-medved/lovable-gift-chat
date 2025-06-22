
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Gift, Share2, Sparkles, ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "Quick Chat",
      description: "Answer 8 fun questions about interests and preferences"
    },
    {
      icon: Gift,
      title: "Get Ideas",
      description: "Receive 8-10 personalized gift recommendations"
    },
    {
      icon: Share2,
      title: "Share Easily",
      description: "Get a link to share - no sign-up required"
    }
  ];

  const steps = [
    { number: "1", title: "Start Chat", description: "Click to begin your 5-minute discovery journey" },
    { number: "2", title: "Answer Questions", description: "Share your interests, hobbies, and preferences" },
    { number: "3", title: "Get Recommendations", description: "Receive personalized gift ideas" },
    { number: "4", title: "Share Your List", description: "Send your link to friends and family" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">GiftAI</span>
          </div>
          <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
            How it works
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-slate-700">
              <Sparkles className="w-4 h-4 text-purple-600" />
              AI-Powered Gift Discovery
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            Gift Ideas That 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Actually Matter
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover personalized gift recommendations through a fun AI-powered chat. 
            No sign-up required - just share your link!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => navigate('/chat')}
            >
              Start Discovery Chat
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" size="lg" className="text-slate-600 hover:text-slate-800">
              See Example List
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            No sign-up required • Takes 5 minutes
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Three simple steps to discover and share perfect gift ideas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Steps Process */}
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200"></div>
                  )}
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Perfect Gifts?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your personalized discovery journey in just 5 minutes
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/chat')}
          >
            Start Discovery Chat
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">GiftAI</span>
            </div>
            <div className="flex gap-8 text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 GiftAI. Making gift-giving effortless.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
