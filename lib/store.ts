import { create } from 'zustand';

export type InterviewSession = {
  date: string;
  score: number;
  role: string;
};

type CareerStore = {
  resumeText: string;
  resumeScore: number;
  skills: string[];
  interviewSessions: InterviewSession[];
  setResumeData: (text: string, score: number, skills: string[]) => void;
  addInterviewSession: (session: InterviewSession) => void;
};

export const useCareerStore = create<CareerStore>((set) => ({
  resumeText: "",
  resumeScore: 0,
  skills: [],
  interviewSessions: [],
  setResumeData: (text, score, skills) => set({ resumeText: text, resumeScore: score, skills }),
  addInterviewSession: (session) => set((state) => ({ 
    interviewSessions: [...state.interviewSessions, session] 
  })),
}));
