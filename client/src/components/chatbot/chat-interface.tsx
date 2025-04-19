import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/types";
import { chatBubbleVariants, listVariants } from "@/lib/animation";
import { useUser } from "@/contexts/user-context";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
      // Focus back on input after sending
      inputRef.current?.focus();
    }
  };
  
  const getInitials = (name: string = "User") => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-neutral-100 rounded-2xl shadow-md overflow-hidden h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="bg-white p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="bg-accent text-white">
            <AvatarFallback>RB</AvatarFallback>
            <AvatarImage src="/bot-avatar.png" />
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium text-red-400">RhythmBot</h3>
            <div className="flex items-center text-xs text-neutral-500">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
            <path d="M8 16H3v5"/>
          </svg>
        </Button>
      </div>
      
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <motion.div 
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="space-y-4"
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              variants={chatBubbleVariants}
              className={`flex ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              {message.sender === 'bot' && (
                <Avatar className="w-8 h-8 mr-3 flex-shrink-0 bg-accent text-white">
                  <AvatarFallback>RB</AvatarFallback>
                  <AvatarImage src="/bot-avatar.png" />
                </Avatar>
              )}
              
              <div 
                className={`
                  ${message.sender === 'user' 
                    ? 'bg-primary text-white rounded-lg rounded-tr-none max-w-[80%]' 
                    : 'bg-white rounded-lg rounded-tl-none max-w-[80%] text-red-500'}
                  p-3
                `}
              >
                {message.content.split('\n').map((line, i) => {
                  // Check if line is a list item with * or -
                  if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                    return (
                      <div key={i} className="flex items-start my-1">
                        <span className="mr-2">•</span>
                        <span>{line.trim().substring(1).trim()}</span>
                      </div>
                    );
                  }
                  return <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>;
                })}
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="w-8 h-8 ml-3 flex-shrink-0 bg-primary/20 text-accent">
                  <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  <AvatarImage src={user?.profileImage} />
                </Avatar>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </motion.div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about fitness and nutrition..."
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="ml-2 rounded-full w-10 h-10 bg-primary text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}
