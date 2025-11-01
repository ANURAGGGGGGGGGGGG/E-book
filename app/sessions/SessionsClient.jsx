"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchBooks, formatBookData } from '../../lib/googleBooks';
import ProfileCard from '../../components/ProfileCard';

export default function SessionsClient({ query, currentPage, pageSize }) {
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  const startIndex = currentPage * pageSize;

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await searchBooks(query, startIndex, pageSize);
        if (cancelled) return;
        setTotal(res.totalItems || 0);
        const formatted = (res.items || []).map(formatBookData);
        setBooks(formatted);
      } catch (err) {
        console.error('Error loading sessions:', err);
        if (!cancelled) setError('Failed to load books. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [query, startIndex, pageSize]);

  const goToPage = (page) => {
    const params = new URLSearchParams({ page: String(page), q: query });
    router.push(`/sessions?${params.toString()}`);
  };

  const hasPrev = currentPage > 0;
  const hasNext = startIndex + pageSize < total;

  return (
    <>
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
    </>
  );
}