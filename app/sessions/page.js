'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchBooks, formatBookData } from '../../lib/googleBooks';
import ProfileCard from '../../components/ProfileCard';
import StarBorder from '../../components/StarBorder';

const PAGE_SIZE = 10;
const DEFAULT_QUERY = 'subject:fiction'; // Broad default; can be changed via ?q=

export default function BookSessions() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const currentPage = Number(searchParams.get('page') || 0);
  const query = searchParams.get('q') || DEFAULT_QUERY;
  const startIndex = currentPage * PAGE_SIZE;

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await searchBooks(query, startIndex, PAGE_SIZE);
        setTotal(res.totalItems || 0);
        const formatted = (res.items || []).map(formatBookData);
        setBooks(formatted);
      } catch (err) {
        console.error('Error loading sessions:', err);
        setError('Failed to load books. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [query, startIndex]);

  const goToPage = (page) => {
    const params = new URLSearchParams({ page: String(page), q: query });
    router.push(`/sessions?${params.toString()}`);
  };

  const hasPrev = currentPage > 0;
  const hasNext = startIndex + PAGE_SIZE < total;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header provided by global Navbar in layout */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-start mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Sessions</h1>
        </div>

        {/* Status */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading books...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-500 text-white px-4 py-2 rounded-lg">{error}</div>
        )}

        {!loading && books.length === 0 && (
          <p className="text-gray-600">No books found.</p>
        )}

        {/* Books Grid */}
        {books.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <ProfileCard
                  key={book.id}
                  name={book.title}
                  title={book.authors?.join(', ')}
                  handle={book.publisher?.replace(/\s+/g, '').toLowerCase()}
                  status={book.saleability === 'FOR_SALE' ? 'On Sale' : 'Available'}
                  contactText="View Details"
                  avatarUrl={book.smallThumbnail || book.thumbnail}
                  coverUrl={book.thumbnail}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  description={book.description}
                  onContactClick={() => { window.location.href = `/book/${book.id}`; }}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px] disabled:opacity-50"
                onClick={() => hasPrev && goToPage(currentPage - 1)}
                disabled={!hasPrev}
              >
                ◀ Previous
              </button>
              <span className="text-gray-700">Page {currentPage + 1}</span>
              <button
                className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px] disabled:opacity-50"
                onClick={() => hasNext && goToPage(currentPage + 1)}
                disabled={!hasNext}
              >
                Next ▶
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}