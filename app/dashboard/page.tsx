import { getServerSession } from "next-auth";
import { createClient } from "@supabase/supabase-js";
import SectionCard from "@/components/SectionCard";
import StatCard from "@/components/StatCard";
import { ResumeLineChart, InterviewBarChart } from "@/components/DashboardCharts";
import { GoalChecklist } from "@/components/GoalChecklist";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('email', session.user.email)
    .single();

  if (!profile) {
    return <div className="text-center pt-24">User profile not found. Please log in again.</div>;
  }

  const userId = profile.id;

  const [resumesRes, interviewsRes, goalsRes] = await Promise.all([
    supabaseAdmin.from('resumes').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
    supabaseAdmin.from('interview_sessions').select('*').eq('user_id', userId).order('created_at', { ascending: true }),
    supabaseAdmin.from('goals').select('*').eq('user_id', userId).order('created_at', { ascending: true })
  ]);

  const resumes = resumesRes.data || [];
  const interviews = interviewsRes.data || [];
  const goals = goalsRes.data || [];

  const completedGoals = goals.filter(g => g.completed).length;

  const avgInterviewScore = interviews.length > 0 
    ? Math.round(interviews.reduce((acc, curr) => acc + curr.session_score, 0) / interviews.length)
    : 0;

  return (
    <div className="flex-1 flex flex-col items-center py-12 px-4 w-full">
        <div className="w-full max-w-7xl flex flex-col gap-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-brand-gray/30 pb-6 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Dashboard</h1>
                    <p className="text-brand-gray text-lg">Welcome back, {session.user.name}.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Resumes Uploaded" value={resumes.length} subtext="Track your iterations" trend="up" />
                <StatCard title="Avg Interview Score" value={avgInterviewScore} subtext="Across all mock interviews" trend="up" />
                <StatCard title="Goals Completed" value={completedGoals} subtext="This week" trend="up" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <SectionCard title="Resume Score Trajectory">
                        <div className="h-72 w-full bg-[#111] border border-brand-gray/30 rounded-xl mt-2 p-4">
                            <ResumeLineChart data={resumes} />
                        </div>
                    </SectionCard>

                    <SectionCard title="Mock Interview Scores">
                        <div className="h-72 w-full bg-[#111] border border-brand-gray/30 rounded-xl mt-2 p-4">
                            <InterviewBarChart data={interviews} />
                        </div>
                    </SectionCard>
                </div>

                <div className="lg:col-span-1 flex flex-col gap-8">
                    <SectionCard title="Weekly Checklist">
                        <GoalChecklist goals={goals} userId={userId} />
                    </SectionCard>
                </div>
            </div>
        </div>
    </div>
  );
}