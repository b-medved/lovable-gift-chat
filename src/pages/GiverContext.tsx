
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Gift, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GiverContext = () => {
  const navigate = useNavigate();
  const [occasion, setOccasion] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [relationship, setRelationship] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const handleContinue = () => {
    if (!occasion || !budgetRange || !relationship || !recipientName) return;
    
    // Store context in localStorage for now (later could be database)
    const context = {
      occasion,
      budgetRange,
      relationship,
      recipientName,
      id: Date.now().toString()
    };
    localStorage.setItem('giverContext', JSON.stringify(context));
    
    // Navigate to share page with context
    navigate('/share');
  };

  const isFormValid = occasion && budgetRange && relationship && recipientName;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-slate-300 hover:text-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 dream-gradient rounded-lg flex items-center justify-center magic-glow">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-50">GiftAI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full text-sm font-medium text-slate-300 border border-slate-700">
                <Sparkles className="w-4 h-4 text-violet-400" />
                Step 1 of 2
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Let's Set the Context
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mx-auto">
              Tell us a bit about the gift occasion so we can help your friend give you perfect recommendations
            </p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName" className="text-slate-200 font-medium">
                  Who are you shopping for?
                </Label>
                <Input
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Sarah, my best friend"
                  className="bg-slate-700 border-slate-600 text-slate-50 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="occasion" className="text-slate-200 font-medium">
                  What's the occasion?
                </Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-50">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="housewarming">Housewarming</SelectItem>
                    <SelectItem value="just-because">Just Because</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="text-slate-200 font-medium">
                  What's your budget range?
                </Label>
                <Select value={budgetRange} onValueChange={setBudgetRange}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-50">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="under-25">Under $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200-500">$200 - $500</SelectItem>
                    <SelectItem value="500-plus">$500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship" className="text-slate-200 font-medium">
                  What's your relationship?
                </Label>
                <Select value={relationship} onValueChange={setRelationship}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-50">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="best-friend">Best Friend</SelectItem>
                    <SelectItem value="close-friend">Close Friend</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="family-member">Family Member</SelectItem>
                    <SelectItem value="romantic-partner">Romantic Partner</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="colleague">Colleague</SelectItem>
                    <SelectItem value="acquaintance">Acquaintance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!isFormValid}
                className="w-full dream-gradient hover:opacity-90 text-white py-3 text-lg font-semibold magic-glow"
              >
                Continue to Share Link
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GiverContext;
