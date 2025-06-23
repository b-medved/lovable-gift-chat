
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Copy, RotateCcw, ExternalLink, ChevronDown, ChevronUp, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface GiftItem {
  id: string;
  name: string;
  priceRange: string;
  category: string;
  description: string;
  reasoning: string;
  link?: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl] = useState('https://giftai.app/list/abc123');

  const mockGifts: GiftItem[] = [
    {
      id: '1',
      name: 'Premium Coffee Subscription',
      priceRange: '$25-50',
      category: 'Food & Drink',
      description: 'Monthly delivery of freshly roasted coffee beans from around the world',
      reasoning: 'Perfect for cozy weekend vibes and someone who appreciates quality beverages. The subscription format means they\'ll think of the giver every month - creating ongoing connection!'
    },
    {
      id: '2',
      name: 'Noise-Canceling Headphones',
      priceRange: '$80-150',
      category: 'Technology',
      description: 'High-quality wireless headphones with active noise cancellation',
      reasoning: 'Ideal for indoor relaxation activities like music, podcasts, or focusing on hobbies. Shows you understand their need for peaceful personal time.'
    },
    {
      id: '3',
      name: 'Cozy Reading Sanctuary Kit',
      priceRange: '$40-80',
      category: 'Home & Living',
      description: 'Luxurious throw blanket, reading pillow, and warm ambient lighting',
      reasoning: 'Creates the perfect environment for weekend relaxation. This gift says "I want you to have beautiful moments of peace and comfort."'
    },
    {
      id: '4',
      name: 'Artisan Self-Care Collection',
      priceRange: '$30-60',
      category: 'Beauty & Wellness',
      description: 'Handcrafted face masks, serums, and bath products with natural ingredients',
      reasoning: 'An indulgent treat that encourages self-care weekends. Shows thoughtfulness about their wellbeing and creates spa-like experiences at home.'
    },
    {
      id: '5',
      name: 'Smart Herb Garden',
      priceRange: '$35-70',
      category: 'Home & Garden',
      description: 'Self-watering indoor garden with LED grow lights for fresh herbs',
      reasoning: 'Combines indoor hobby appeal with practical benefits. Perfect for someone who enjoys nurturing plants and cooking with fresh ingredients.'
    },
    {
      id: '6',
      name: 'Premium Puzzle Collection',
      priceRange: '$20-45',
      category: 'Games & Puzzles',
      description: 'Beautiful artistic jigsaw puzzles and brain teasers for quiet entertainment',
      reasoning: 'Ideal for peaceful weekend activities and mindful relaxation. Shows you appreciate their love for engaging, contemplative pastimes.'
    },
    {
      id: '7',
      name: 'Aromatherapy Experience Set',
      priceRange: '$25-55',
      category: 'Wellness',
      description: 'Elegant diffuser with curated essential oil collection',
      reasoning: 'Creates a calming atmosphere for indoor relaxation. The wellness aspect shows care for their mental and emotional wellbeing.'
    },
    {
      id: '8',
      name: 'Gourmet Tea Journey',
      priceRange: '$30-65',
      category: 'Food & Drink',
      description: 'Curated selection of premium loose-leaf teas with tasting notes',
      reasoning: 'Perfect for creating special weekend moments and exploring new flavors. Encourages mindful, meditative tea rituals they can enjoy.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with friends and family",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 dream-gradient rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse magic-glow">
            <RotateCcw className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-50 mb-2">Creating Perfect Gift Ideas</h2>
          <p className="text-slate-300">AI is analyzing preferences and crafting thoughtful recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="w-full py-6 px-6 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-slate-300 hover:text-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/chat')} className="border-slate-600 text-slate-300 hover:text-slate-50">
                Create Another List
              </Button>
              <Button 
                onClick={handleShare}
                className="dream-gradient hover:opacity-90 text-white magic-glow"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share List
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-violet-400" />
              Perfect Gift Ideas
            </h1>
            <p className="text-lg text-slate-300">
              Thoughtfully curated by AI to create meaningful moments of connection
            </p>
          </div>
        </div>
      </header>

      {/* Share Section */}
      <section className="w-full py-6 px-6 dark-dream-gradient">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-300" />
            Share these gift ideas with friends and family
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <code className="bg-slate-800/50 px-4 py-2 rounded-lg text-sm border border-slate-600 text-slate-200 flex-1 max-w-md">
              {shareUrl}
            </code>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 border-slate-300 text-slate-100 hover:bg-slate-800/50">
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
          <p className="text-sm text-slate-300 mt-2">Give gifts with confidence - they'll love these thoughtful choices!</p>
        </div>
      </section>

      {/* Gift Cards Grid */}
      <section className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockGifts.map((gift) => (
              <Card 
                key={gift.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-700 bg-slate-800/50 hover:bg-slate-800/70 overflow-hidden magic-glow"
                onClick={() => toggleExpanded(gift.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                      {gift.category}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-500/50 bg-green-500/10">
                      {gift.priceRange}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-50 mb-3 group-hover:text-violet-300 transition-colors">
                    {gift.name}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {gift.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-violet-400 hover:text-violet-300 p-0 h-auto font-semibold"
                    >
                      Why this gift?
                      {expandedCard === gift.id ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                    {gift.link && (
                      <Button variant="ghost" size="sm" className="p-0 h-auto text-slate-400 hover:text-slate-300">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {expandedCard === gift.id && (
                    <div className="mt-4 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg animate-accordion-down">
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {gift.reasoning}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-6 bg-slate-800 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-4">
            Ready to Give Meaningful Gifts?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Share this list with gift-givers, or create a new discovery journey!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleShare}
              className="dream-gradient hover:opacity-90 text-white px-8 py-3 magic-glow"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share These Ideas
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/chat')}
              className="px-8 py-3 border-slate-600 text-slate-300 hover:text-slate-50"
            >
              Create New Discovery
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
