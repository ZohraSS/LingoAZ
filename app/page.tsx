export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold text-blue-500">
        📘 LingoAZ
      </h1>

      <p className="mt-4 text-xl text-slate-300">
        Learn English Smarter
      </p>

      <input
        type="text"
        placeholder="🔍 Search any word..."
        className="mt-10 w-full max-w-xl rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-lg outline-none focus:border-blue-500"
      />

      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
          <button
            key={level}
            className="rounded-xl bg-blue-600 px-5 py-3 hover:bg-blue-700 transition"
          >
            {level}
          </button>
        ))}
      </div>
    </main>
  );
}