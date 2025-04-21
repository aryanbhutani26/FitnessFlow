// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { ChatMessage } from "@/types";
// import { chatBubbleVariants, listVariants } from "@/lib/animation";
// import { useUser } from "@/contexts/user-context";

// interface ChatInterfaceProps {
//   messages: ChatMessage[];
//   onSendMessage: (message: string) => void;
// }

// export default function ChatInterface({
//   messages,
//   onSendMessage,
// }: ChatInterfaceProps) {
//   const { user } = useUser();
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (input.trim()) {
//       onSendMessage(input);
//       setInput("");
//       // Focus back on input after sending
//       inputRef.current?.focus();
//     }
//   };

//   const getInitials = (name: string = "User") => {
//     return name
//       .split(" ")
//       .map((part) => part[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <div className="bg-neutral-800 rounded-2xl shadow-md overflow-hidden h-[600px] flex flex-col">
//       {/* Chat Header */}
//       <div className="bg-gray-400 p-4 border-b flex items-center justify-between">
//         <div className="flex items-center">
//           <Avatar className="bg-accent text-white">
//             <AvatarFallback>RB</AvatarFallback>
//             <AvatarImage src="/bot-avatar.png" />
//           </Avatar>
//           <div className="ml-3">
//             <h3 className="font-medium text-accent">RhythmBot</h3>
//             <div className="flex items-center text-xs text-neutral-500">
//               <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
//               <span>Online</span>
//             </div>
//           </div>
//         </div>
//         <Button variant="ghost" size="icon" className="rounded-full">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="lucide lucide-refresh-cw"
//           >
//             <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
//             <path d="M21 3v5h-5" />
//             <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
//             <path d="M8 16H3v5" />
//           </svg>
//         </Button>
//       </div>

//       {/* Messages Area */}
//       <ScrollArea className="flex-1 p-4">
//         <motion.div
//           variants={listVariants}
//           initial="initial"
//           animate="animate"
//           className="space-y-4"
//         >
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               variants={chatBubbleVariants}
//               className={`flex text-secondary ${
//                 message.sender === "user" ? "justify-end" : ""
//               }`}
//             >
//               {message.sender === "bot" && (
//                 <Avatar className="w-8 h-8 mr-3 flex-shrink-0 bg-accent text-white">
//                   <AvatarFallback>RB</AvatarFallback>
//                   <AvatarImage src="/bot-avatar.png" />
//                 </Avatar>
//               )}

//               <div
//                 className={`
//                   ${
//                     message.sender === "user"
//                       ? "bg-primary text-white rounded-lg rounded-tr-none max-w-[80%]"
//                       : "bg-white rounded-lg rounded-tl-none max-w-[80%]"
//                   }
//                   p-3
//                 `}
//               >
//                 {message.content.split("\n").map((line, i) => {
//                   // Check if line is a list item with * or -
//                   if (
//                     line.trim().startsWith("*") ||
//                     line.trim().startsWith("-")
//                   ) {
//                     return (
//                       <div key={i} className="flex items-start my-1">
//                         <span className="mr-2">•</span>
//                         <span>{line.trim().substring(1).trim()}</span>
//                       </div>
//                     );
//                   }
//                   return (
//                     <p key={i} className={i > 0 ? "mt-2" : ""}>
//                       {line}
//                     </p>
//                   );
//                 })}
//               </div>

//               {message.sender === "user" && (
//                 <Avatar className="w-8 h-8 ml-3 flex-shrink-0 bg-primary/20 text-accent">
//                   <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
//                   <AvatarImage src={user?.profileImage} />
//                 </Avatar>
//               )}
//             </motion.div>
//           ))}
//           <div ref={messagesEndRef} />
//         </motion.div>
//       </ScrollArea>

//       {/* Input Area */}
//       <div className="p-4 bg-gray-600 border-t">
//         <form onSubmit={handleSubmit} className="flex items-center">
//           {/* <Input
//             ref={inputRef}
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask me anything about fitness and nutrition..."
//             className="flex-1 text-black bg-white"
//           /> */}

//           <Input
//             ref={inputRef}
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask me anything about fitness and nutrition..."
           
//           />

//           <Button
//             type="submit"
//             size="icon"
//             className="ml-2 rounded-full w-10 h-10 bg-primary text-white"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="lucide lucide-send"
//             >
//               <path d="m22 2-7 20-4-9-9-4Z" />
//               <path d="M22 2 11 13" />
//             </svg>
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

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
  isLoading?: boolean;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
}: ChatInterfaceProps) {
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
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
      inputRef.current?.focus();
    }
  };

  const getInitials = (name: string = "User") => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.trim().startsWith('[') && line.trim().endsWith(']')) {
        return (
          <h4 key={i} className="font-semibold text-accent mb-1">
            {line.replace(/[\[\]]/g, '')}
          </h4>
        );
      }
      if (line.trim().startsWith("-") || line.trim().startsWith("•")) {
        return (
          <div key={i} className="flex items-start my-1">
            <span className="mr-2">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }
      return (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {line}
        </p>
      );
    });
  };

  return (
    <div className="bg-neutral-800 rounded-2xl shadow-md overflow-hidden h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="bg-gray-400 p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Avatar className="bg-accent text-white">
            <AvatarFallback>RB</AvatarFallback>
            <AvatarImage src="/bot-avatar.png" />
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium text-accent">RhythmBot</h3>
            <div className="flex items-center text-xs text-neutral-500">
              <div className="w-2 h-2 bg-secondary rounded-full mr-2 animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full"
          onClick={() => {
            setInput("");
            inputRef.current?.focus();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-refresh-cw"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
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
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <Avatar className="w-8 h-8 mr-3 flex-shrink-0 bg-accent text-white">
                  <AvatarFallback>RB</AvatarFallback>
                  <AvatarImage src="/bot-avatar.png" />
                </Avatar>
              )}

              <div
                className={`
                  ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-lg rounded-tr-none max-w-[80%]"
                      : "bg-white text-gray-800 rounded-lg rounded-tl-none max-w-[80%]"
                  }
                  p-4 shadow-md
                `}
              >
                {message.sender === "user" ? (
                  <p>{message.content}</p>
                ) : (
                  renderMessageContent(message.content)
                )}
              </div>

              {message.sender === "user" && (
                <Avatar className="w-8 h-8 ml-3 flex-shrink-0 bg-primary/20 text-accent">
                  <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  <AvatarImage src={user?.profileImage} />
                </Avatar>
              )}
            </motion.div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center">
              <Avatar className="w-8 h-8 mr-3 flex-shrink-0 bg-accent text-white">
                <AvatarFallback>RB</AvatarFallback>
                <AvatarImage src="/bot-avatar.png" />
              </Avatar>
              <div className="bg-white rounded-lg rounded-tl-none p-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </motion.div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-gray-600 border-t">
        <form onSubmit={handleSubmit} className="flex items-center">
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about fitness and nutrition..."
            disabled={isLoading}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus-visible:ring-primary"
          />

          <Button
            type="submit"
            size="icon"
            className={`ml-2 rounded-full w-10 h-10 ${
              isLoading ? "bg-gray-400" : "bg-primary hover:bg-primary/90"
            } text-white`}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}