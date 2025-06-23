
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, SkipForward, Sparkles, Heart } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

interface GiverContext {
  occasion: string;
  budgetRange: string;
  relationship: string;
  recipientName: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [giverContext, setGiverContext] = useState<GiverContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const totalQuestions = 8;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get giver context from URL
    const contextParam = searchParams.get('context');
    if (contextParam) {
      try {
        const context = JSON.parse(decodeURIComponent(contextParam));
        setGiverContext(context);
      } catch (error) {
        console.error('Error parsing context:', error);
      }
    }

    // Add initial message
    if (messages.length === 0) {
      addInitialMessage();
    }
  }, [giverContext]);

  const addInitialMessage = () => {
    const welcomeText = giverContext 
      ? `✨ Hi! Someone who cares about you wants to get you the perfect ${giverContext.occasion} gift! I'm here to help them understand what you'd truly love. Let's start with getting to know you better - what's your favorite way to spend a relaxing weekend?`
      : "✨ Hi! Someone who cares about you wants to get you the perfect gift! I'm here to help them understand what you'd truly love. What's your favorite way to spend a relaxing weekend?";
    
    addMessage(welcomeText, true);
  };

  const addMessage = (text: string, isAi: boolean, isStreaming: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAi,
      timestamp: new Date(),
      isStreaming
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  };

  const updateStreamingMessage = (messageId: string, newText: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, text: newText, isStreaming: false }
        : msg
    ));
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage = inputValue.trim();
    addMessage(userMessage, false);
    setUserAnswers(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const messageId = addMessage('', true, true);
      let streamedText = '';

      const response = await fetch('/api/discovery/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          questionNumber: currentQuestion + 1,
          giverContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                streamedText += data.content;
                updateStreamingMessage(messageId, streamedText);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setCurrentQuestion(prev => prev + 1);
      
      // Check if we've completed all questions
      if (currentQuestion + 1 >= totalQuestions) {
        setTimeout(() => {
          localStorage.setItem('chatAnswers', JSON.stringify([...userAnswers, userMessage]));
          if (giverContext) {
            localStorage.setItem('giverContext', JSON.stringify(giverContext));
          }
          navigate('/results');
        }, 2000);
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      updateStreamingMessage(messageId || '', 'Sorry, I encountered an error. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSkip = () => {
    if (currentQuestion >= 5) {
      localStorage.setItem('chatAnswers', JSON.stringify(userAnswers));
      if (giverContext) {
        localStorage.setItem('giverContext', JSON.stringify(giverContext));
      }
      navigate('/results');
    }
  };

  const progress = ((currentQuestion) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
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
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-50 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                Gift Discovery Chat
              </span>
              <span className="text-xs text-slate-400">
                Question {currentQuestion + 1} of {totalQuestions}
                {giverContext && (
                  <span className="ml-2 text-pink-400">
                    <Heart className="w-3 h-3 inline mr-1" />
                    For your {giverContext.occasion}
                  </span>
                )}
              </span>
            </div>
          </div>
          {currentQuestion >= 5 && (
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-300">
              <SkipForward className="w-4 h-4 mr-2" />
              Skip remaining
            </Button>
          )}
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <Progress value={progress} className="h-2 bg-slate-700" />
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isAi ? 'justify-start' : 'justify-end'} animate-fade-in`}>
              <div className={`max-w-md ${message.isAi ? 'w-full max-w-2xl' : ''}`}>
                <Card className={`p-4 ${
                  message.isAi 
                    ? 'bg-slate-800 border-slate-700 text-slate-50' 
                    : 'dream-gradient text-white border-0 magic-glow'
                }`}>
                  <p className="leading-relaxed mb-2">
                    {message.text}
                    {message.isStreaming && <span className="animate-pulse">|</span>}
                  </p>
                  <span className={`text-xs block ${
                    message.isAi ? 'text-slate-400' : 'text-slate-200'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Card>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <Card className="max-w-md p-4 bg-slate-800 border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-slate-400">AI is thinking...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full py-6 px-6 bg-slate-800 border-t border-slate-700">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="text-lg py-3 px-4 border-2 border-slate-600 focus:border-violet-500 bg-slate-700 text-slate-50 placeholder:text-slate-400"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="dream-gradient hover:opacity-90 text-white px-6 py-3 magic-glow"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Question {currentQuestion + 1} of {totalQuestions} • AI-powered gift discovery
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
