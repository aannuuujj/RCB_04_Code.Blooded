"use client";

import { useState } from "react";
import { toggleGoal, addGoal } from "@/lib/actions/goals";

export function GoalChecklist({ goals, userId }: { goals: any[], userId: string }) {
  const [goalList, setGoalList] = useState(goals);
  const [newGoal, setNewGoal] = useState("");

  const handleToggle = async (id: string, current: boolean) => {
    // optimistic UI
    setGoalList(goalList.map(g => g.id === id ? { ...g, completed: !current } : g));
    await toggleGoal(id, !current);
  };

  const handleAdd = async () => {
    if (!newGoal.trim()) return;
    const goalText = newGoal;
    setNewGoal("");
    
    // optimistic UI
    const tempId = crypto.randomUUID();
    setGoalList([...goalList, { id: tempId, goal_text: goalText, completed: false }]);
    
    const res = await addGoal(userId, goalText);
    if (res.data) {
       setGoalList(prev => prev.map(g => g.id === tempId ? { ...g, id: res.data.id } : g));
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-2">
      {goalList.map((goal) => (
        <label key={goal.id} className={`flex items-center gap-4 p-4 bg-[#111] border ${goal.completed ? 'border-brand-gray/30' : 'border-brand-gray/50'} rounded-xl cursor-pointer hover:border-brand-white transition-colors`}>
            <input 
              type="checkbox" 
              checked={goal.completed}
              onChange={() => handleToggle(goal.id, goal.completed)}
              className="w-5 h-5 accent-brand-white bg-brand-black border-brand-gray" 
            />
            <span className={`text-brand-white font-medium ${goal.completed ? 'line-through opacity-50' : ''}`}>
              {goal.goal_text}
            </span>
        </label>
      ))}
      
      {goalList.length === 0 && <p className="text-brand-gray text-sm italic py-2">No goals set for this week.</p>}
      
      <div className="flex gap-2 mt-4 pt-4 border-t border-brand-gray/30">
        <input 
          type="text" 
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="New goal..." 
          className="flex-1 px-4 py-2 bg-brand-black border border-brand-gray text-brand-white rounded-xl focus:outline-none focus:border-brand-white transition-colors"
        />
        <button onClick={handleAdd} className="bg-brand-white text-brand-black px-4 py-2 font-bold rounded-xl hover:bg-brand-light transition-colors">Add</button>
      </div>
    </div>
  );
}
