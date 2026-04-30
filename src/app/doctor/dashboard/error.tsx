'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Something went wrong</h2>
        <p className="text-sm text-gray-500">We encountered an error loading your dashboard.</p>
        <button
          onClick={() => unstable_retry()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
