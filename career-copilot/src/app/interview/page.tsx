"use client";
import { useState } from "react";
import { useSpeechInput } from "@/hooks/useSpeechInput";
import { Mic, MicOff, Send, RotateCcw, ChevronRight, Brain } from "lucide-react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { ErrorCard } from "@/components/ErrorCard";

const QUESTIONS = [
  "Tell me about yourself and your background.",
  "What are your greatest strengths and weaknesses?",
  "Describe a challenging project you worked on and how you handled it.",
  "Why do you want this role and what makes you a good fit?",
  "Where do you see yourself in 5 years?",
  "How do you handle tight deadlines and pressure?",
  "Give an example of how you worked effectively in a team.",
];

interface QA { question: string; answer: string; score: number; feedback: string; }

function scoreAnswer(answer: string): { score: number; feedback: string } {
  const words = answer.trim().split(/\s+/).length;
  if (words < 10) return { score: 3, feedback: "Too brief. Elaborate with examples using the STAR method." };
  if (words < 30) return { score: 6, feedback: "Good start! Add specific examples or outcomes to strengthen your answer." };
  if (words < 80) return { score: 8, feedback: "Strong answer! Clear and concise with good detail." };
  return { score: 9, feedback: "Excellent! Detailed, structured, and compelling response." };
}

export default function InterviewPage() {
  const { isListening, transcript, startListening, stopListening, supported, resetTranscript } = useSpeechInput();
  const [qIndex, setQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<QA[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const currentQ = QUESTIONS[qIndex];
  const progress = Math.round((qIndex / QUESTIONS.length) * 100);

  function handleMic() {
    if (isListening) {
      stopListening();
      setAnswer((prev) => (prev + " " + transcript).trim());
      resetTranscript();
    } else {
      startListening();
    }
  }

  function submitAnswer() {
    if (!answer.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const { score, feedback } = scoreAnswer(answer);
      setHistory((h) => [...h, { question: currentQ, answer, score, feedback }]);
      setAnswer("");
      resetTranscript();
      setLoading(false);
      if (qIndex + 1 >= QUESTIONS.length) setDone(true);
      else setQIndex((i) => i + 1);
    }, 800);
  }

  const avgScore = history.length
    ? Math.round(history.reduce((s, q) => s + q.score, 0) / history.length)
    : 0;

  if (done) {
    return (
      <div className="min-h-screen pt-14 bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain size={28} className="text-black" />
            </div>
            <h1 className="text-3xl font-black">Interview Complete!</h1>
            <p className="text-white/50 text-sm">Here's your performance summary</p>
          </div>

          <div className="bg-white/4 border border-white/8 rounded-2xl p-6 text-center">
            <p className="text-6xl font-black text-white">{avgScore}<span className="text-2xl text-white/40">/10</span></p>
            <p className="text-white/50 text-sm mt-1">Average Score</p>
          </div>

          <div className="space-y-3">
            {history.map((qa, i) => (
              <div key={i} className="bg-white/4 border border-white/8 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-white/60 flex-1 pr-4">{qa.question}</p>
                  <span className="text-white font-bold text-sm shrink-0">{qa.score}/10</span>
                </div>
                <p className="text-xs text-white/40 italic">{qa.feedback}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setQIndex(0); setHistory([]); setDone(false); setAnswer(""); }}
            className="w-full py-3 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/8 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} /> Restart Interview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Brain size={18} className="text-white/50" />
          <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Mock Interview</span>
          <span className="ml-auto text-xs text-white/30 font-mono">{qIndex + 1}/{QUESTIONS.length}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white/4 border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 font-mono mb-3">Question {qIndex + 1}</p>
          <p className="text-white font-semibold text-lg leading-relaxed">{currentQ}</p>
        </div>

        {/* Answer area */}
        <div className="space-y-3">
          <textarea
            value={isListening ? answer + (transcript ? " " + transcript : "") : answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer or use the microphone..."
            rows={6}
            className="w-full bg-white/4 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-all resize-none font-sans"
          />

          <div className="flex gap-3">
            {supported && (
              <button
                onClick={handleMic}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border
                  ${isListening
                    ? "bg-red-500/20 border-red-500/40 text-red-400 animate-pulse"
                    : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-white/25"
                  }`}
              >
                {isListening ? <><MicOff size={14} /> Stop</> : <><Mic size={14} /> Speak</>}
              </button>
            )}

            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              className="flex-1 py-2.5 bg-white text-black font-semibold text-sm rounded-xl hover:bg-white/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                : <>{qIndex + 1 < QUESTIONS.length ? "Next Question" : "Finish"} <ChevronRight size={14} /></>
              }
            </button>
          </div>
        </div>

        {loading && <SkeletonCard lines={2} />}

        {/* History preview */}
        {history.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-white/30 font-mono uppercase tracking-widest">Previous Answers</p>
            {history.slice(-2).map((qa, i) => (
              <div key={i} className="bg-white/3 border border-white/6 rounded-xl p-3 flex justify-between items-center gap-4">
                <p className="text-xs text-white/50 truncate flex-1">{qa.question}</p>
                <span className="text-xs font-mono text-white shrink-0">{qa.score}/10</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
