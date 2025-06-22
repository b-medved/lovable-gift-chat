
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, SkipForward } from "lucide-react";
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
    "Hi! I'm excited to help you discover amazing gift ideas! 🎁 Let's start with something fun - what's your favorite way to spend a weekend?",
    "That sounds wonderful! What kind of hobbies or activities make you lose track of time?",
    "Interesting! Are you more of an indoor person or do you love outdoor adventures?",
    "Got it! When it comes to style, do you prefer modern and sleek things, or more classic and timeless pieces?",
    "Perfect! What's your budget range for gifts? Don't worry, I'll find great options in any range!",
    "Almost there! Do you prefer practical gifts you can use daily, or special treats that feel indulgent?",
    "Excellent! Are you interested in experiences (like classes or events) or physical items you can unwrap?",
    "Last question! Is there anything you're really hoping to avoid or definitely don't want as a gift?"
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
        addMessage("Perfect! I have everything I need. Let me generate your personalized gift recommendations... ✨", true);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-800">
                Discovery Chat
              </span>
              <span className="text-xs text-slate-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
          </div>
          {currentQuestion >= 4 && (
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-slate-600">
              <SkipForward className="w-4 h-4 mr-2" />
              Skip remaining
            </Button>
          )}
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isAi ? 'justify-start' : 'justify-end'} animate-fade-in`}>
              <Card className={`max-w-md p-4 ${
                message.isAi 
                  ? 'bg-white border border-slate-200' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0'
              }`}>
                <p className="leading-relaxed">{message.text}</p>
                <span className={`text-xs mt-2 block ${
                  message.isAi ? 'text-slate-500' : 'text-blue-100'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Card>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <Card className="max-w-md p-4 bg-white border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-slate-500">AI is typing...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full py-6 px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your answer..."
                className="text-lg py-3 px-4 border-2 border-slate-200 focus:border-blue-500"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Press Enter to send • Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
