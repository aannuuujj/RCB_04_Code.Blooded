import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { question, answer, question_number } = await req.json();

    if (question_number < 5) {
      return NextResponse.json({
        score: "8/10",
        feedback: "Good approach! You mentioned virtualization which is key. However, you could also discuss data pagination on the server side to show deeper system design knowledge.",
        next_question: "Can you explain how you would handle complex global state management in this application?"
      });
    } else {
      // Final Question reached
      return NextResponse.json({
        score: "9/10",
        feedback: "Excellent final answer! Great communication skills and clear structuring of your thoughts.",
        final_report: {
          session_score: 84,
          weak_areas: ["State Management Edge Cases", "Testing Strategies"],
          strong_areas: ["Performance Optimization", "Component Design", "Communication"],
          top_tip: "Before jumping into coding explanations, always clarify the constraints of the data payload from the API with the interviewer."
        }
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to process answer" }, { status: 500 });
  }
}
