import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  Area, 
  AreaChart 
} from "recharts";
import { cardVariants } from "@/lib/animation";
import { CalorieData, WorkoutData } from "@/types";

interface WeeklyOverviewProps {
  calorieData: CalorieData[];
  workoutData?: WorkoutData[];
  stepsData?: any[];
}

export default function WeeklyOverview({ 
  calorieData, 
  workoutData,
  stepsData 
}: WeeklyOverviewProps) {
  const [activeData, setActiveData] = useState<'calories' | 'workouts' | 'steps'>('calories');
  const [chartData, setChartData] = useState(calorieData);
  
  // Update chart data when active data type changes
  useEffect(() => {
    switch (activeData) {
      case 'calories':
        setChartData(calorieData);
        break;
      case 'workouts':
        setChartData(workoutData || []);
        break;
      case 'steps':
        setChartData(stepsData || []);
        break;
    }
  }, [activeData, calorieData, workoutData, stepsData]);

  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <motion.div 
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6 text-secondary">
        <h3 className="font-medium">Weekly Overview</h3>
        <div className="flex space-x-2">
          {['calories', 'workouts', 'steps'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveData(type as any)}
              className={`text-xs px-3 py-1 rounded-full capitalize ${
                activeData === type 
                  ? 'bg-primary text-white' 
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-56">
        {activeData === 'calories' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF4757" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF4757" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f1f1f1" 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888', dx: 15 }}
                tickFormatter={(value) => dayLabels[new Date(value).getDay()]}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                domain={['dataMin - 200', 'dataMax + 200']}
                hide
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="consumed" 
                stroke="#FF4757" 
                fillOpacity={1}
                fill="url(#colorConsumed)" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="burned" 
                stroke="#2ED573" 
                strokeWidth={2}
                strokeDasharray="5 3" 
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        
        {activeData === 'workouts' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f1f1f1" 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888', dx: 15 }}
                tickFormatter={(value) => dayLabels[new Date(value).getDay()]}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                domain={[0, 'dataMax + 1']}
                hide
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#7158e2" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="duration" 
                stroke="#FF9F43" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        
        {activeData === 'steps' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#1E90FF" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#f1f1f1" 
              />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888', dx: 15 }}
                tickFormatter={(value) => dayLabels[new Date(value).getDay()]}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
                domain={[0, 'dataMax + 1000']}
                hide
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="steps" 
                stroke="#1E90FF" 
                fillOpacity={1}
                fill="url(#colorSteps)" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="flex justify-between text-xs text-neutral-500 mt-3">
        {dayLabels.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4">
        {activeData === 'calories' && (
          <>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
              <span className="text-sm text-red-700">Consumed</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-secondary mr-2"></span>
              <span className="text-sm text-red-700">Burned</span>
            </div>
          </>
        )}
        
        {activeData === 'workouts' && (
          <>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-accent mr-2"></span>
              <span className="text-sm">Sessions</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-warning mr-2"></span>
              <span className="text-sm">Duration (min)</span>
            </div>
          </>
        )}
        
        {activeData === 'steps' && (
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-info mr-2"></span>
            <span className="text-sm">Steps</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
