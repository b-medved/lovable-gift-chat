
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Copy, RotateCcw, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
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
      reasoning: 'Perfect for someone who enjoys cozy weekends and appreciates quality beverages. The subscription format means they\'ll think of you every month!'
    },
    {
      id: '2',
      name: 'Bluetooth Noise-Canceling Headphones',
      priceRange: '$80-150',
      category: 'Technology',
      description: 'High-quality wireless headphones with active noise cancellation',
      reasoning: 'Great for indoor activities like listening to music, podcasts, or focusing on hobbies. The modern design matches their preference for sleek items.'
    },
    {
      id: '3',
      name: 'Cozy Reading Nook Set',
      priceRange: '$40-80',
      category: 'Home & Living',
      description: 'Soft throw blanket, reading pillow, and ambient book light',
      reasoning: 'Perfect for weekend relaxation and indoor hobbies. Creates a dedicated space for their favorite activities.'
    },
    {
      id: '4',
      name: 'Artisan Skincare Kit',
      priceRange: '$30-60',
      category: 'Beauty & Wellness',
      description: 'Luxurious face masks, serums, and moisturizers with natural ingredients',
      reasoning: 'An indulgent treat for self-care weekends. The artisan quality gives it a special, non-practical feel they mentioned wanting.'
    },
    {
      id: '5',
      name: 'Smart Plant Growing Kit',
      priceRange: '$35-70',
      category: 'Home & Garden',
      description: 'Self-watering herb garden with LED grow lights',
      reasoning: 'Combines their love for indoor activities with something practical yet special. Modern design with classic appeal.'
    },
    {
      id: '6',
      name: 'Puzzle & Game Collection',
      priceRange: '$20-45',
      category: 'Games & Puzzles',
      description: 'Beautiful jigsaw puzzles and brain teasers for quiet entertainment',
      reasoning: 'Perfect for weekend activities and losing track of time. Engaging without being too practical or mundane.'
    },
    {
      id: '7',
      name: 'Aromatherapy Diffuser Set',
      priceRange: '$25-55',
      category: 'Home & Wellness',
      description: 'Elegant ultrasonic diffuser with essential oil starter set',
      reasoning: 'Creates a relaxing atmosphere for indoor activities. The sleek design and wellness benefits make it both modern and indulgent.'
    },
    {
      id: '8',
      name: 'Gourmet Tea Tasting Set',
      priceRange: '$30-65',
      category: 'Food & Drink',
      description: 'Curated selection of premium loose-leaf teas with tasting notes',
      reasoning: 'Perfect for cozy weekend moments and trying new flavors. Feels special and indulgent without being overly practical.'
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <RotateCcw className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Creating Your Gift List</h2>
          <p className="text-slate-600">Our AI is analyzing your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="w-full py-6 px-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/chat')}>
                Create Another List
              </Button>
              <Button 
                onClick={handleShare}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share List
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Your Gift Ideas
            </h1>
            <p className="text-lg text-slate-600">
              Thoughtfully curated by AI based on your preferences
            </p>
          </div>
        </div>
      </header>

      {/* Share Section */}
      <section className="w-full py-6 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="font-semibold text-slate-800 mb-2">Share this list with others</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <code className="bg-white px-4 py-2 rounded-lg text-sm border text-slate-600 flex-1 max-w-md">
              {shareUrl}
            </code>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>
        </div>
      </section>

      {/* Gift Cards Grid */}
      <section className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockGifts.map((gift) => (
              <Card 
                key={gift.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-md overflow-hidden"
                onClick={() => toggleExpanded(gift.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700">
                      {gift.category}
                    </Badge>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {gift.priceRange}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {gift.name}
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {gift.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold"
                    >
                      Why this gift?
                      {expandedCard === gift.id ? (
                        <ChevronUp className="w-4 h-4 ml-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 ml-1" />
                      )}
                    </Button>
                    {gift.link && (
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {expandedCard === gift.id && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-accordion-down">
                      <p className="text-sm text-slate-700 leading-relaxed">
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
      <section className="w-full py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Love Your Recommendations?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Share this list with friends and family, or create a new one!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share This List
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/chat')}
              className="px-8 py-3"
            >
              Create Another List
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
