export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-12">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-5xl font-bold mb-4">
                    AI Career Copilot
                </h1>

                <p className="text-gray-400 mb-10 text-lg">
                    Your personal AI-powered career growth dashboard.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="border border-gray-700 rounded-2xl p-6 bg-zinc-900">
                        <h2 className="text-2xl font-semibold mb-3">
                            Resume Analysis
                        </h2>

                        <p className="text-gray-400">
                            Upload and analyze your resume with AI feedback.
                        </p>

                        <div className="mt-6 text-5xl font-bold">
                            82
                        </div>

                        <p className="text-green-400 mt-2">
                            ATS Friendly
                        </p>
                    </div>

                    <div className="border border-gray-700 rounded-2xl p-6 bg-zinc-900">
                        <h2 className="text-2xl font-semibold mb-3">
                            Interview Practice
                        </h2>

                        <p className="text-gray-400">
                            Practice mock interviews powered by AI.
                        </p>

                        <div className="mt-6 text-5xl font-bold">
                            7.8
                        </div>

                        <p className="text-blue-400 mt-2">
                            Average Score
                        </p>
                    </div>

                    <div className="border border-gray-700 rounded-2xl p-6 bg-zinc-900">
                        <h2 className="text-2xl font-semibold mb-3">
                            Gravity Score
                        </h2>

                        <p className="text-gray-400">
                            Measure how strongly opportunities align with you.
                        </p>

                        <div className="mt-6 text-5xl font-bold">
                            91
                        </div>

                        <p className="text-yellow-400 mt-2">
                            In Orbit 🚀
                        </p>
                    </div>

                </div>

                <div className="mt-12 border border-gray-700 rounded-2xl p-8 bg-zinc-900">
                    <h2 className="text-3xl font-bold mb-4">
                        Weekly Goals
                    </h2>

                    <ul className="space-y-4 text-lg">
                        <li>✅ Improve resume keywords</li>
                        <li>✅ Complete 2 mock interviews</li>
                        <li>⬜ Apply to 5 internships</li>
                        <li>⬜ Learn system design basics</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}