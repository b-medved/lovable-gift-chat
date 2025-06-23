
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, SkipForward, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "✨ Hi there! I'm here to help someone who cares about you discover the perfect gifts for you! Let's make this fun - what's your favorite way to spend a relaxing weekend?",
    "That sounds wonderful! What kind of activities or hobbies make you completely lose track of time?",
    "Love it! Are you more of a cozy indoor person or do you prefer outdoor adventures and activities?",
    "Perfect! When it comes to style and aesthetics, do you lean toward modern & sleek, or classic & timeless pieces?",
    "Great insight! What's a comfortable budget range for gifts? (Don't worry - great gifts exist at every price point!)",
    "Almost there! Do you prefer practical gifts you'll use daily, or special treats that feel indulgent and luxurious?", 
    "Excellent! Are you more interested in experiences (classes, events, activities) or physical items you can unwrap?",
    "Final question! Is there anything you're really hoping to avoid or definitely don't want as a gift?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add initial message
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: '1',
        text: questions[0],
        isAi: true,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, []);

  const addMessage = (text: string, isAi: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAi,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage(inputValue, false);
    const answer = inputValue;
    setUserAnswers(prev => [...prev, answer]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      setIsTyping(false);
      const nextQuestionIndex = currentQuestion + 1;
      
      if (nextQuestionIndex < questions.length) {
        addMessage(questions[nextQuestionIndex], true);
        setCurrentQuestion(nextQuestionIndex);
      } else {
        // Chat completed, navigate to results
        addMessage("Perfect! I have everything needed to create amazing gift recommendations for you. Let me work some magic... ✨", true);
        setTimeout(() => {
          navigate('/results');
        }, 2000);
      }
    }, 1500);
  };

  const handleSkip = () => {
    if (currentQuestion >= 4) {
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
              </span>
            </div>
          </div>
          {currentQuestion >= 4 && (
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
              <Card className={`max-w-md p-4 ${
                message.isAi 
                  ? 'bg-slate-800 border-slate-700 text-slate-50' 
                  : 'dream-gradient text-white border-0 magic-glow'
              }`}>
                <p className="leading-relaxed">{message.text}</p>
                <span className={`text-xs mt-2 block ${
                  message.isAi ? 'text-slate-400' : 'text-slate-200'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
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
            Press Enter to send • Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
