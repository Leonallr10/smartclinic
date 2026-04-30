export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:block w-56 bg-white border-r border-gray-100" />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white h-64 rounded-2xl border border-gray-100" />
              <div className="bg-white h-48 rounded-2xl border border-gray-100" />
            </div>
            <div className="bg-white h-64 rounded-2xl border border-gray-100" />
          </div>
        </div>
      </main>
    </div>
  );
}
