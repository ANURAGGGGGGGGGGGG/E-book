/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBookById, formatBookData } from '../../../lib/googleBooks';
import GlareHover from '../../../components/GlareHover';

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      loadBookDetails(params.id);
    }
  }, [params.id]);

  const loadBookDetails = async (bookId) => {
    try {
      setLoading(true);
      const response = await getBookById(bookId);
      const formattedBook = formatBookData(response);
      setBook(formattedBook);
    } catch (err) {
      setError('Failed to load book details. Please try again.');
      console.error('Error loading book details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested book could not be found.'}</p>
          <Link
            href="/"
            className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header provided by global Navbar in layout */}

      {/* Book Details */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="p-4 sm:p-8 flex justify-center">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-48 sm:w-full max-w-sm h-auto rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Cover+Available';
                  }}
                />
              </div>
            </div>

            {/* Book Information */}
            <div className="md:w-2/3 lg:w-3/4 p-4 sm:p-8">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                {book.subtitle && (
                  <h2 className="text-lg sm:text-xl text-gray-600 mb-4">{book.subtitle}</h2>
                )}
                <p className="text-lg text-gray-700 mb-2">
                  by <span className="font-semibold">{book.authors.join(', ')}</span>
                </p>
                <p className="text-gray-600">
                  Published by {book.publisher} • {book.publishedDate}
                </p>
              </div>

              {/* Rating and Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {book.averageRating > 0 && (
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <span className="text-yellow-600 mr-1">⭐</span>
                    <span className="font-semibold">{book.averageRating}</span>
                    <span className="text-gray-600 ml-1">({book.ratingsCount} reviews)</span>
                  </div>
                )}
                {book.pageCount > 0 && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {book.pageCount} pages
                  </div>
                )}
                {book.language && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    {book.language.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Categories */}
              {book.categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                />
              </div>

              {/* ISBN Information */}
              {(book.isbn10 || book.isbn13) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ISBN</h3>
                  <div className="space-y-1">
                    {book.isbn13 && (
                      <p className="text-gray-700">ISBN-13: <span className="font-mono">{book.isbn13}</span></p>
                    )}
                    {book.isbn10 && (
                      <p className="text-gray-700">ISBN-10: <span className="font-mono">{book.isbn10}</span></p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {book.previewLink && (
                  <GlareHover
                    width="auto"
                    height="auto"
                    background="transparent"
                    borderRadius="9999px"
                    borderColor="transparent"
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    className="inline-block"
                    style={{ display: 'inline-block' }}
                  >
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
                    >
                      📖 Preview Book
                    </a>
                  </GlareHover>
                )}
                {book.infoLink && (
                  <GlareHover
                    width="auto"
                    height="auto"
                    background="transparent"
                    borderRadius="9999px"
                    borderColor="transparent"
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    className="inline-block"
                    style={{ display: 'inline-block' }}
                  >
                    <a
                      href={book.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
                    >
                      📱 View on Google Play
                    </a>
                  </GlareHover>
                )}
                {book.buyLink && book.price && (
                  <GlareHover
                    width="auto"
                    height="auto"
                    background="transparent"
                    borderRadius="9999px"
                    borderColor="transparent"
                    glareColor="#ffffff"
                    glareOpacity={0.3}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    className="inline-block"
                    style={{ display: 'inline-block' }}
                  >
                    <a
                      href={book.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
                    >
                      💳 Buy for {book.price}
                    </a>
                  </GlareHover>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Availability:</span> {book.saleability.replace(/_/g, ' ')}
                  </div>
                  {book.isEbook && (
                    <div>
                      <span className="font-semibold">Format:</span> E-book Available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">Powered by Google Books API</p>
          <p className="text-gray-400 text-sm">
            Book information provided by Google Books
          </p>
        </div>
      </footer>
    </div>
  );
}
