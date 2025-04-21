// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import ChatInterface from "@/components/chatbot/chat-interface";
// import { pageVariants, cardVariants, listItemVariants } from "@/lib/animation";
// import { ChatMessage } from "@/types";
// import { useUser } from "@/contexts/user-context";

// // Quick question suggestions
// const QUESTION_SUGGESTIONS = [
//   "What's the best dance style for beginners?",
//   "How many calories does dancing burn?",
//   "Can you suggest a weekly workout plan?",
//   "What should I eat to build muscle?",
//   "How can I improve my dance technique?"
// ];

// // Initial welcome message
// const getWelcomeMessage = (name: string): ChatMessage => ({
//   id: "welcome",
//   content: `Hi ${name}! I'm your AI fitness coach. How can I help you with your dance and fitness journey today?`,
//   sender: "bot",
//   timestamp: new Date()
// });

// export default function Chatbot() {
//   const { user } = useUser();
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [dailyMotivation, setDailyMotivation] = useState({
//     quote: "Dance like nobody's watching, but move with precision like everyone is.",
//     author: "Your AI Coach"
//   });
//   const [dailyGoal, setDailyGoal] = useState("Complete a 25-minute Zumba session and log all your meals today.");
  
//   // Initialize chat with welcome message
//   useEffect(() => {
//     if (user && messages.length === 0) {
//       setMessages([getWelcomeMessage(user.name)]);
//     }
//   }, [user, messages.length]);

//   const handleSendMessage = async (content: string) => {
//     if (!content.trim()) return;
    
//     // Add user message
//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       content,
//       sender: "user",
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, userMessage]);
    
//     // Get bot response
//     try {
//       // In a real app, this would be an API call to a Gemini-powered endpoint
//       // For this demo, we'll use a simple mock implementation
//       setTimeout(() => {
//         const botResponse = generateResponse(content);
//         setMessages(prev => [...prev, botResponse]);
//       }, 1000);
//     } catch (error) {
//       console.error("Error getting AI response:", error);
      
//       const errorMessage: ChatMessage = {
//         id: `error-${Date.now()}`,
//         content: "I'm sorry, I couldn't process your request. Please try again.",
//         sender: "bot",
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, errorMessage]);
//     }
//   };

//   const handleQuestionClick = (question: string) => {
//     handleSendMessage(question);
//   };

//   // Simple mock implementation of response generation
//   // In a real app, this would be replaced with a call to the Gemini API
//   const generateResponse = (userMessage: string): ChatMessage => {
//     let responseContent = "";
    
//     const lowerCaseMessage = userMessage.toLowerCase();
    
//     if (lowerCaseMessage.includes("stretch") || lowerCaseMessage.includes("zumba")) {
//       responseContent = `Great question! After Zumba, it's important to stretch the muscle groups you've worked. Here are some effective post-Zumba stretches:

// * Quad stretch: Stand on one leg, grab your ankle, and pull gently toward your buttocks
// * Calf stretch: Step one foot back, heel down, and lean forward slightly
// * Hip flexor stretch: Lunge forward, keeping your back straight
// * Shoulder stretch: Cross one arm across your chest and hold with the opposite hand
// * Child's pose: Great for lower back relief

// Hold each stretch for 15-30 seconds and remember to breathe deeply. Would you like me to explain any of these in more detail?`;
//     }
//     else if (lowerCaseMessage.includes("snack") || lowerCaseMessage.includes("energy") || lowerCaseMessage.includes("food")) {
//       responseContent = `For a pre-Zumba snack, you want something with carbs for quick energy and a little protein, eaten about 30-60 minutes before your workout. Some great options:

// * Banana with 1 tbsp of peanut butter
// * Apple slices with a small handful of almonds
// * Greek yogurt with berries
// * Whole grain toast with avocado
// * Smoothie with fruit and a scoop of protein powder

// Based on your profile and weight loss goals, I'd recommend keeping this snack around 150-200 calories.`;
//     }
//     else if (lowerCaseMessage.includes("style") || lowerCaseMessage.includes("beginner")) {
//       responseContent = `For beginners, I recommend starting with Zumba or Hip Hop Fitness. Both are:

// * Fun and engaging, which helps you stay motivated
// * Scalable - you can modify moves to your fitness level
// * Effective for burning calories (300-500 per hour)
// * Great for building coordination and rhythm

// Zumba is particularly beginner-friendly because it combines simple dance steps with fitness moves. The instructor typically shows modifications, and you can go at your own pace.

// I notice you selected ${user?.danceStyle || "Zumba"} as your preferred style. That's an excellent choice! Would you like me to suggest some beginner-friendly routines for this style?`;
//     }
//     else if (lowerCaseMessage.includes("calories") || lowerCaseMessage.includes("burn")) {
//       responseContent = `Dancing is an excellent calorie-burning activity! Here's approximately how many calories different dance styles burn per hour (for someone of your weight, about ${user?.weight || 70}kg):

// * Zumba: 400-600 calories/hour
// * Hip Hop: 370-610 calories/hour
// * Bollywood: 350-550 calories/hour
// * Salsa: 400-480 calories/hour

// The exact amount depends on:
// * Your intensity level
// * Your current fitness level
// * How continuously you dance
// * Your weight and body composition

// For most effective calorie burning, aim for 30-60 minute sessions, 3-5 times per week. Would you like a custom dance workout plan to maximize your calorie burn?`;
//     }
//     else {
//       responseContent = `Thank you for your question! I'm here to help with all your fitness and dance-related needs. 

// Based on your profile, I see that you're focused on ${user?.goal || "overall fitness"} through ${user?.danceStyle || "dance"}. That's a great choice!

// Is there anything specific about your fitness routine, nutrition, or dance technique that you'd like guidance on? I can provide personalized advice to help you reach your goals faster.`;
//     }
    
//     return {
//       id: `response-${Date.now()}`,
//       content: responseContent,
//       sender: "bot",
//       timestamp: new Date()
//     };
//   };

//   return (
//     <motion.section
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       variants={pageVariants}
//       className="py-20 bg-black"
//     >
//       <div className="container mx-auto px-4 pt-16">
//         <h2 className="text-2xl font-poppins font-bold mb-2 text-primary">AI Fitness Coach</h2>
//         <p className="text-neutral-600 mb-10">Get personalized fitness advice, motivation, and answers to all your health questions</p>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Chat Interface */}
//           <motion.div 
//             variants={cardVariants}
//             className="lg:col-span-2"
//           >
//             <ChatInterface 
//               messages={messages}
//               onSendMessage={handleSendMessage}
//             />
//           </motion.div>
          
//           {/* Suggestions Panel */}
//           <motion.div variants={listItemVariants}>
//             {/* Quick Questions */}
//             <Card className="mb-6">
//               <CardContent className="p-6">
//                 <h3 className="font-medium mb-4">Ask Me About</h3>
//                 <div className="space-y-2">
//                   {QUESTION_SUGGESTIONS.map((question, index) => (
//                     <Button
//                       key={index}
//                       variant="outline"
//                       className="w-full text-left justify-start h-auto py-3 px-3 font-normal"
//                       onClick={() => handleQuestionClick(question)}
//                     >
//                       {question}
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Today's Motivation */}
//             <motion.div 
//               variants={cardVariants}
//               whileHover={{ y: -5 }}
//               className="bg-gradient-to-br from-accent to-accent-dark text-white rounded-2xl p-6"
//             >
//               <h3 className="font-medium mb-4">Today's Motivation</h3>
//               <div className="mb-6">
//                 <blockquote className="text-lg font-poppins">
//                   "{dailyMotivation.quote}"
//                 </blockquote>
//                 <div className="mt-3 text-white/70 text-sm">— {dailyMotivation.author}</div>
//               </div>
//               <div className="border-t border-white/20 pt-4 mt-4">
//                 <h4 className="text-sm font-medium mb-2">Your Daily Goal</h4>
//                 <p className="text-sm text-white/80">{dailyGoal}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ChatInterface from "@/components/chatbot/chat-interface";
import { pageVariants, cardVariants, listItemVariants } from "@/lib/animation";
import { ChatMessage } from "@/types";
import { useUser } from "@/contexts/user-context";

// Quick question suggestions
const QUESTION_SUGGESTIONS = [
  "What's the best dance style for beginners?",
  "How many calories does dancing burn?",
  "Can you suggest a weekly workout plan?",
  "What should I eat to build muscle?",
  "How can I improve my dance technique?"
];

// Initial welcome message
const getWelcomeMessage = (name: string): ChatMessage => ({
  id: "welcome",
  content: `Hi ${name}! I'm your AI fitness coach. How can I help you with your dance and fitness journey today?`,
  sender: "bot",
  timestamp: new Date()
});

// API configuration
const API_URL = "https://fitnessbot-9aq2.onrender.com/fitness-coach";

export default function Chatbot() {
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dailyMotivation, setDailyMotivation] = useState({
    quote: "Dance like nobody's watching, but move with precision like everyone is.",
    author: "Your AI Coach"
  });
  const [dailyGoal, setDailyGoal] = useState("Complete a 25-minute Zumba session and log all your meals today.");
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (user && messages.length === 0) {
      setMessages([getWelcomeMessage(user.name)]);
    }
  }, [user, messages.length]);

  // Updated handleSendMessage function in chatbot.tsx
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await axios.post(API_URL, {
        description: content
      });
      
      let botResponseContent = "";
      try {
        // Clean the response string first
        let jsonString = response.data.response
          .replace(/^```json|```$/g, '')  // Remove markdown code markers
          .replace(/\\"/g, '"')           // Fix escaped quotes
          .replace(/\\n/g, '\n')          // Fix newlines
          .trim();
        
        // Parse the JSON
        const responseData = JSON.parse(jsonString);
        
        // Format the response with proper line breaks and bullet points
        botResponseContent = [
          responseData.fitness_advice && `[Advice]\n${responseData.fitness_advice}`,
          responseData.workout_plan && `[Workout Plan]\n${
            Array.isArray(responseData.workout_plan) 
              ? responseData.workout_plan.map((item: { exercise: any; sets: any; reps: any; time: any; }) => 
                  typeof item === 'string' 
                    ? `• ${item}` 
                    : `• ${item.exercise}: ${item.sets} sets of ${item.reps || item.time}`
                ).join('\n')
              : responseData.workout_plan
          }`,
          responseData.diet_tips && `[Diet Tips]\n${responseData.diet_tips}`
        ].filter(Boolean).join('\n\n');
        
      } catch (e) {
        console.error("Error parsing response:", e);
        // Fallback to cleaned raw response
        botResponseContent = response.data.response
          .replace(/^```json|```$/g, '')
          .replace(/\\"/g, '"')
          .replace(/\\n/g, '\n')
          .replace(/\\{/g, '{')
          .replace(/\\}/g, '}')
          .trim();
      }
      
      const botResponse: ChatMessage = {
        id: `response-${Date.now()}`,
        content: botResponseContent,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <motion.section
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="py-20 bg-black"
    >
      <div className="container mx-auto px-4 pt-16">
        <h2 className="text-2xl font-poppins font-bold mb-2 text-primary">AI Fitness Coach</h2>
        <p className="text-neutral-600 mb-10">Get personalized fitness advice, motivation, and answers to all your health questions</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <motion.div 
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <ChatInterface 
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </motion.div>
          
          {/* Suggestions Panel */}
          <motion.div variants={listItemVariants}>
            {/* Quick Questions */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Ask Me About</h3>
                <div className="space-y-2">
                  {QUESTION_SUGGESTIONS.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto py-3 px-3 font-normal"
                      onClick={() => handleQuestionClick(question)}
                      disabled={isLoading}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Today's Motivation */}
            <motion.div 
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-accent to-accent-dark text-white rounded-2xl p-6"
            >
              <h3 className="font-medium mb-4">Today's Motivation</h3>
              <div className="mb-6">
                <blockquote className="text-lg font-poppins">
                  "{dailyMotivation.quote}"
                </blockquote>
                <div className="mt-3 text-white/70 text-sm">— {dailyMotivation.author}</div>
              </div>
              <div className="border-t border-white/20 pt-4 mt-4">
                <h4 className="text-sm font-medium mb-2">Your Daily Goal</h4>
                <p className="text-sm text-white/80">{dailyGoal}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}