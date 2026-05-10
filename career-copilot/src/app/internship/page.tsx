"use client";
import { useState } from "react";
import { Briefcase, MapPin, Clock, ExternalLink, Search, Filter } from "lucide-react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";

const ALL_INTERNSHIPS = [
  { id: 1, title: "Frontend Engineer Intern", company: "Google", location: "Remote", duration: "3 months", match: 92, tags: ["React", "TypeScript", "CSS"], link: "#" },
  { id: 2, title: "Data Science Intern", company: "Microsoft", location: "Hyderabad", duration: "6 months", match: 87, tags: ["Python", "ML", "SQL"], link: "#" },
  { id: 3, title: "Backend Developer Intern", company: "Razorpay", location: "Bangalore", duration: "3 months", match: 81, tags: ["Node.js", "AWS", "Docker"], link: "#" },
  { id: 4, title: "ML Research Intern", company: "DeepMind", location: "Remote", duration: "4 months", match: 76, tags: ["Python", "TensorFlow", "Research"], link: "#" },
  { id: 5, title: "Product Engineer Intern", company: "Zepto", location: "Mumbai", duration: "2 months", match: 71, tags: ["React", "Node.js", "SQL"], link: "#" },
  { id: 6, title: "DevOps Intern", company: "Atlassian", location: "Remote", duration: "3 months", match: 65, tags: ["Docker", "Kubernetes", "CI/CD"], link: "#" },
  { id: 7, title: "AI/ML Intern", company: "NVIDIA", location: "Pune", duration: "6 months", match: 60, tags: ["Python", "CUDA", "PyTorch"], link: "#" },
  { id: 8, title: "Mobile Dev Intern", company: "PhonePe", location: "Bangalore", duration: "3 months", match: 52, tags: ["React Native", "TypeScript"], link: "#" },
];

function MatchBadge({ match }: { match: number }) {
  const color = match >= 80 ? "bg-white text-black" : match >= 65 ? "bg-white/15 text-white border border-white/25" : "bg-white/6 text-white/50 border border-white/12";
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>{match}% match</span>;
}

export default function InternshipPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "remote" | "high">("all");

  const filtered = ALL_INTERNSHIPS.filter((i) => {
    const matchesQuery = i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.company.toLowerCase().includes(query.toLowerCase()) ||
      i.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    const matchesFilter = filter === "all" ? true :
      filter === "remote" ? i.location === "Remote" :
      i.match >= 75;
    return matchesQuery && matchesFilter;
  });

  function handleSearch(q: string) {
    setQuery(q);
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }

  return (
    <div className="min-h-screen pt-14 bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={18} className="text-white/50" />
            <span className="text-xs text-white/40 font-mono uppercase tracking-widest">Opportunity Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gradient mb-2">Internship Matches</h1>
          <p className="text-white/50 text-sm">AI-ranked opportunities based on your profile gravity.</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search role, company or skill..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "remote", "high"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border
                  ${filter === f ? "bg-white text-black border-white" : "bg-white/5 text-white/60 border-white/10 hover:border-white/25"}`}
              >
                {f === "all" ? "All" : f === "remote" ? "Remote" : "Top Matches"}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
          <span>{filtered.length} opportunities</span>
          <span>·</span>
          <span>Avg match: {filtered.length ? Math.round(filtered.reduce((s, i) => s + i.match, 0) / filtered.length) : 0}%</span>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} lines={3} />)}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No matches found"
            description="Try a different search term or adjust your filters."
            action={{ label: "Clear filters", onClick: () => { setQuery(""); setFilter("all"); } }}
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bg-white/3 border border-white/8 rounded-2xl p-5 hover:bg-white/6 hover:border-white/15 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="font-semibold text-white text-sm">{job.title}</h2>
                      <MatchBadge match={job.match} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/40 mt-1 flex-wrap">
                      <span className="font-medium text-white/60">{job.company}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{job.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/6 text-white/60 border border-white/10 rounded-full text-xs">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={job.link}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90 transition-all opacity-0 group-hover:opacity-100 shrink-0"
                  >
                    Apply <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-white/8 flex justify-between items-center">
          <p className="text-xs text-white/30">Showing {filtered.length} of {ALL_INTERNSHIPS.length} opportunities</p>
          <Link href="/gravity" className="text-xs text-white/50 hover:text-white transition-colors">Calculate your gravity →</Link>
        </div>
      </div>
    </div>
  );
}
