
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2, MessageSquare, Mail, Link2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GiverContext {
  occasion: string;
  budgetRange: string;
  relationship: string;
  recipientName: string;
  id: string;
}

const Share = () => {
  const navigate = useNavigate();
  const [context, setContext] = useState<GiverContext | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const storedContext = localStorage.getItem('giverContext');
    if (storedContext) {
      const parsedContext = JSON.parse(storedContext);
      setContext(parsedContext);
      
      // Generate share URL with context
      const baseUrl = window.location.origin;
      const contextParam = encodeURIComponent(JSON.stringify({
        occasion: parsedContext.occasion,
        budgetRange: parsedContext.budgetRange,
        relationship: parsedContext.relationship,
        recipientName: parsedContext.recipientName
      }));
      setShareUrl(`${baseUrl}/chat?context=${contextParam}`);
    } else {
      navigate('/giver-context');
    }
  }, [navigate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Help me pick the perfect ${context?.occasion} gift for you!`);
    const body = encodeURIComponent(`Hi ${context?.recipientName}!\n\nI want to get you something you'll really love for your ${context?.occasion}. Could you take 5 minutes to chat with this AI? It'll help me find the perfect gift for you.\n\n${shareUrl}\n\nThanks!`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaText = () => {
    const text = encodeURIComponent(`Hi ${context?.recipientName}! Help me pick the perfect ${context?.occasion} gift for you - just chat with this AI for 5 minutes: ${shareUrl}`);
    window.open(`sms:?body=${text}`);
  };

  if (!context) return null;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/giver-context')}
            className="text-slate-300 hover:text-slate-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-sm text-slate-400">Step 2 of 2</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 dream-gradient rounded-2xl flex items-center justify-center magic-glow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">
              Perfect! Now Share This Link
            </h1>
            <p className="text-xl text-slate-300 max-w-xl mx-auto">
              Send this to {context.recipientName} - they'll chat with AI for 5 minutes and you'll get perfect gift ideas
            </p>
          </div>

          {/* Context Summary */}
          <Card className="bg-slate-800/30 border-slate-700 mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-50 mb-4">Gift Context</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Occasion:</span>
                  <span className="text-slate-50 ml-2 capitalize">{context.occasion.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Budget:</span>
                  <span className="text-slate-50 ml-2">{context.budgetRange.replace('-', ' - $')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Relationship:</span>
                  <span className="text-slate-50 ml-2 capitalize">{context.relationship.replace('-', ' ')}</span>
                </div>
                <div>
                  <span className="text-slate-400">Recipient:</span>
                  <span className="text-slate-50 ml-2">{context.recipientName}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share Link */}
          <Card className="bg-slate-800/50 border-slate-700 mb-8">
            <CardContent className="p-6">
              <div className="flex gap-3 mb-6">
                <Input
                  value={shareUrl}
                  readOnly
                  className="bg-slate-700 border-slate-600 text-slate-50 text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="dream-gradient hover:opacity-90 text-white px-6 magic-glow"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <h4 className="text-slate-200 font-medium">Quick Share Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button
                    onClick={shareViaText}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-50 hover:bg-slate-600"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Text Message
                  </Button>
                  <Button
                    onClick={shareViaEmail}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-50 hover:bg-slate-600"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `Help me pick your perfect ${context.occasion} gift!`,
                          text: `Chat with AI for 5 minutes to help me find the perfect gift for you`,
                          url: shareUrl
                        });
                      } else {
                        copyToClipboard();
                      }
                    }}
                    variant="outline"
                    className="bg-slate-700 border-slate-600 text-slate-50 hover:bg-slate-600"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    More Options
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <div className="text-center text-slate-400">
            <p className="mb-2">What happens next?</p>
            <p className="text-sm">
              When {context.recipientName} completes the 5-minute chat, you'll get an email with their curated gift preferences and purchase recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
