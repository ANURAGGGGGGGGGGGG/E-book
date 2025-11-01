import { Suspense } from 'react';
import SessionsClient from './SessionsClient';

const PAGE_SIZE = 10;
const DEFAULT_QUERY = 'subject:fiction'; // Broad default; can be changed via ?q=

export default function BookSessions({ searchParams }) {
  const currentPage = Number(searchParams?.page ?? 0);
  const query = searchParams?.q ?? DEFAULT_QUERY;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header provided by global Navbar in layout */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-start mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Sessions</h1>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600 mx-auto" />
              <p className="mt-4 text-gray-600">Loading books...</p>
            </div>
          }
        >
          <SessionsClient query={query} currentPage={currentPage} pageSize={PAGE_SIZE} />
        </Suspense>
      </main>
    </div>
  );
}