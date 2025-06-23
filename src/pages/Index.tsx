import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Gift, Share2, Sparkles, ArrowRight, Heart, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircle,
      title: "5-Minute Magic",
      description: "Send your friend a quick AI chat that reveals their perfect gift preferences"
    },
    {
      icon: Gift,
      title: "Perfect Matches",
      description: "Get 8-10 personalized gift ideas that they'll actually love and appreciate"
    },
    {
      icon: Star,
      title: "Gift With Confidence",
      description: "Never wonder if they'll like it again - know they will"
    }
  ];

  const steps = [
    { number: "1", title: "Share the Magic", description: "Send your friend the AI chat link - takes them 5 minutes" },
    { number: "2", title: "AI Discovers", description: "They answer fun questions about their interests and style" },
    { number: "3", title: "Get Perfect Ideas", description: "Receive their personalized gift recommendations" },
    { number: "4", title: "Give Meaningfully", description: "Choose gifts that create genuine connection" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-slate-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 dream-gradient rounded-lg flex items-center justify-center magic-glow">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-50">GiftAI</span>
          </div>
          <Button variant="ghost" className="text-slate-300 hover:text-slate-50">
            How it works
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full text-sm font-medium text-slate-300 border border-slate-700">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Never Stress About Gifts Again
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-50 mb-6 leading-tight">
            Give Gifts That{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Truly Matter
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get your friends to chat with AI for 5 minutes, then give gifts that create 
            meaningful moments of connection. Turn gift anxiety into gift excitement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="dream-gradient hover:opacity-90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group magic-glow"
              onClick={() => navigate('/giver-context')}
            >
              Start Gift Discovery
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" size="lg" className="text-slate-300 hover:text-slate-50 border border-slate-700 hover:border-slate-600">
              See Example Results
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-slate-400 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-pink-400" />
            No sign-up required • 5-minute friend chat • Perfect gift confidence
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              From Gift Anxiety to Gift Excitement
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Eliminate guesswork and create meaningful moments of connection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-700 bg-slate-800/50 hover:bg-slate-800/70 magic-glow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 dream-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 magic-glow">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-50 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
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
                  <div className="w-12 h-12 dream-gradient rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 magic-glow">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-purple-500/50"></div>
                  )}
                </div>
                <h4 className="font-semibold text-slate-50 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-6">
              Perfect for Every Gift Occasion
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-50 mb-2">Gift Emergencies</h3>
                <p className="text-slate-400 text-sm">Last-minute birthdays, anniversaries, holidays</p>
              </div>
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-50 mb-2">Meaningful Moments</h3>
                <p className="text-slate-400 text-sm">Strengthen bonds with thoughtful giving</p>
              </div>
              <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                <Gift className="w-8 h-8 text-violet-400 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-50 mb-2">Stress-Free Giving</h3>
                <p className="text-slate-400 text-sm">Turn obligation into joyful connection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 dark-dream-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Give Gifts That Matter?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your friend's 5-minute discovery journey today
          </p>
          <Button 
            size="lg" 
            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/giver-context')}
          >
            Create Gift Discovery Link
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 dream-gradient rounded-lg flex items-center justify-center magic-glow">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-50">GiftAI</span>
            </div>
            <div className="flex gap-8 text-slate-400">
              <a href="#" className="hover:text-slate-50 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-50 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-50 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 GiftAI. Transforming gift-giving into meaningful connection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
