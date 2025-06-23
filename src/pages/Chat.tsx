
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
  options?: string[];
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

  const questions = [
    {
      text: "✨ Hi! Someone who cares about you wants to get you the perfect {occasion} gift! I'm here to help them understand what you'd truly love. What's your favorite way to spend a relaxing weekend?",
      options: ["Reading or watching movies at home", "Exploring outdoors and being active", "Spending time with friends and family", "Working on hobbies or creative projects"]
    },
    {
      text: "That sounds wonderful! What kind of activities make you completely lose track of time?",
      options: ["Creative activities (art, music, writing)", "Physical activities (sports, hiking, yoga)", "Learning new things (courses, books, documentaries)", "Social activities (parties, game nights, events)"]
    },
    {
      text: "Love it! When it comes to your personal style, which appeals to you most?",
      options: ["Modern and minimalist", "Classic and timeless", "Bohemian and artistic", "Trendy and fashionable"]
    },
    {
      text: "Perfect! Do you prefer gifts that are:",
      options: ["Practical - things I'll use every day", "Special treats - luxury items I wouldn't buy myself", "Experiences - activities or events to enjoy", "Personal - something meaningful and sentimental"]
    },
    {
      text: "Great insight! What's most important to you in a gift?",
      options: ["It shows they really know me", "It's something I'll treasure forever", "It's useful and improves my daily life", "It creates fun memories or experiences"]
    },
    {
      text: "Almost done! Is there anything you're really hoping to avoid or definitely don't want?",
      options: ["Nothing specific - I'm open to surprises", "Please no clothing or accessories", "Nothing too personal or intimate", "No tech gadgets or electronics"]
    }
  ];

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
      const initialQuestion = questions[0];
      const initialMessage: Message = {
        id: '1',
        text: giverContext 
          ? initialQuestion.text.replace('{occasion}', giverContext.occasion)
          : initialQuestion.text.replace('{occasion}', 'special'),
        isAi: true,
        timestamp: new Date(),
        options: initialQuestion.options
      };
      setMessages([initialMessage]);
    }
  }, [giverContext]);

  const addMessage = (text: string, isAi: boolean, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAi,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    handleAnswer(option);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    handleAnswer(inputValue);
  };

  const handleAnswer = (answer: string) => {
    // Add user message
    addMessage(answer, false);
    setUserAnswers(prev => [...prev, answer]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      setIsTyping(false);
      const nextQuestionIndex = currentQuestion + 1;
      
      if (nextQuestionIndex < questions.length) {
        const nextQuestion = questions[nextQuestionIndex];
        addMessage(nextQuestion.text, true, nextQuestion.options);
        setCurrentQuestion(nextQuestionIndex);
      } else {
        // Chat completed, show curated options
        addMessage("Perfect! I have everything needed to create amazing gift recommendations. Let me show you some curated options based on your preferences... ✨", true);
        setTimeout(() => {
          // Store answers for results page
          localStorage.setItem('chatAnswers', JSON.stringify(userAnswers.concat([answer])));
          if (giverContext) {
            localStorage.setItem('giverContext', JSON.stringify(giverContext));
          }
          navigate('/results');
        }, 2000);
      }
    }, 1500);
  };

  const handleSkip = () => {
    if (currentQuestion >= 3) {
      navigate('/results');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

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
                Question {currentQuestion + 1} of {questions.length}
                {giverContext && (
                  <span className="ml-2 text-pink-400">
                    <Heart className="w-3 h-3 inline mr-1" />
                    For your {giverContext.occasion}
                  </span>
                )}
              </span>
            </div>
          </div>
          {currentQuestion >= 3 && (
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
                  <p className="leading-relaxed mb-2">{message.text}</p>
                  <span className={`text-xs block ${
                    message.isAi ? 'text-slate-400' : 'text-slate-200'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </Card>
                
                {/* Option buttons for AI messages */}
                {message.isAi && message.options && !isTyping && (
                  <div className="mt-4 space-y-2">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        variant="outline"
                        className="w-full text-left justify-start bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-slate-50"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
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
                placeholder="Or type your own answer..."
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
            Choose from options above or type your own • Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
