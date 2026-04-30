import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-purple-600">404</p>
        <h2 className="text-xl font-semibold text-gray-900">Page not found</h2>
        <p className="text-sm text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
