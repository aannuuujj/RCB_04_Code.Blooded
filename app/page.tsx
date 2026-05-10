export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10">

      <h1 className="text-5xl font-bold mb-6">
        AI Career Copilot
      </h1>

      <p className="text-gray-400 mb-10 text-center">
        Smart AI assistant for student career growth
      </p>

      <div className="border border-gray-700 p-10 rounded-2xl w-full max-w-xl flex flex-col items-center">

        <input
          type="file"
          className="mb-6 w-full border border-gray-700 rounded-lg p-3 bg-zinc-900"
        />

        <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
          Analyze Resume
        </button>

      </div>

    </main>
  );
}