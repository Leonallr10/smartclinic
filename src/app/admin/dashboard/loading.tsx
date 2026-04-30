export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block w-56 bg-white border-r border-gray-100" />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 w-56 bg-gray-200 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white h-24 rounded-2xl border border-gray-100" />
            ))}
          </div>
          <div className="bg-white h-48 rounded-2xl border border-gray-100" />
        </div>
      </main>
    </div>
  );
}
