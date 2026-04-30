'use client';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
          <p className="text-gray-500">An unexpected error occurred.</p>
          <button
            onClick={() => unstable_retry()}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
