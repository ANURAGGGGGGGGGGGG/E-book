/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchBooks, formatBookData, getBooksByCategory } from '../lib/googleBooks';
import SplitText from '../components/SplitText';
import GlowButton from '../components/GlowButton';
import ProfileCard from '../components/ProfileCard';
// Shuffle now used in global Navbar

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [featuredBooks, setFeaturedBooks] = useState([]);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  // Load featured books on component mount
  useEffect(() => {
    loadFeaturedBooks();
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      const response = await getBooksByCategory('fiction', 8);
      if (response.items) {
        const formatted = response.items.map(formatBookData);
        setFeaturedBooks(formatted);
      }
    } catch (err) {
      console.error('Error loading featured books:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await searchBooks(searchQuery, 0, 20);
      if (response.items) {
        const formattedBooks = response.items.map(formatBookData);
        setBooks(formattedBooks);
      } else {
        setBooks([]);
        setError('No books found for your search.');
      }
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Using ProfileCard for book display; map directly in JSX below

  // BookCard with tilt styling, restoring cover image and description
  const BookCard = ({ book, featured = false }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState(
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    );

    const handleMouseMove = (e) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      setTransform(
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
      );
    };

    const handleMouseLeave = () => {
      setTransform(
        'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
      );
    };

    const imgSrc = book.thumbnail || '/placeholder-book.png';

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: 'transform 150ms ease',
          transformStyle: 'preserve-3d',
        }}
        className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg overflow-hidden"
      >
        <div className="relative">
          <img
            src={imgSrc}
            alt={book.title || 'Book cover'}
            className={`w-full ${featured ? 'h-64' : 'h-56'} object-cover`}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-book.png';
            }}
          />
          {book.averageRating > 0 && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-lg">
              ⭐ {book.averageRating}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{book.title}</h3>
          {book.subtitle && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{book.subtitle}</p>
          )}
          {book.authors?.length > 0 && (
            <p className="text-sm text-gray-700 mt-1">{book.authors.join(', ')}</p>
          )}
          {book.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{book.description}</p>
          )}
          <div
            className={`mt-4 w-full flex items-center ${
              book.previewLink ? 'justify-between' : 'justify-start'
            }`}
          >
            <Link
              href={`/book/${book.id}`}
              className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
            >
              View Details
            </Link>
            {book.previewLink && (
              <a
                href={book.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
              >
                Preview
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header moved to global Navbar in layout */}

      {/* Search Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SplitText
            text="Find Your Next Great Read"
            tag="h2"
            className="text-4xl font-bold mb-4"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <SplitText
            text="Search through millions of books, authors, and topics"
            tag="p"
            className="text-xl mb-8 opacity-90"
            delay={30}
            duration={0.5}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.15}
            rootMargin="-80px"
            textAlign="center"
          />
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <div className="cursor-target rounded-[20px] border border-white/20 bg-white/10">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="q"
                  placeholder="Search for books, authors, ISBN, or topics..."
                  className="bg-transparent text-white placeholder-white/70 px-4 py-3 focus:outline-none w-64 sm:w-80"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="cursor-target rounded-[20px] bg-black/70 hover:bg-black text-white border border-gray-800 py-[16px] px-[26px]"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      {books.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Search Results ({books.length} books found)
          </h2>
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
        </section>
      )}

      {/* Featured Books */}
      {featuredBooks.length > 0 && books.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Fiction Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.slice(0, 8).map((book) => (
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
        </section>
      )}

      {/* Categories */}
      {books.length === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Fiction', query: 'subject:fiction' },
              { name: 'Science', query: 'subject:science' },
              { name: 'History', query: 'subject:history' },
              { name: 'Biography', query: 'subject:biography' },
              { name: 'Technology', query: 'subject:technology' },
              { name: 'Art', query: 'subject:art' },
              { name: 'Business', query: 'subject:business' },
              { name: 'Health', query: 'subject:health' },
            ].map((category) => (
              <GlowButton
                as={Link}
                key={category.name}
                href={`/sessions?q=${encodeURIComponent(category.query)}&page=0`}
                className="w-full cursor-target"
              >
                <span>{category.name}</span>
              </GlowButton>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-2">Powered by Google Books API</p>
          <p className="text-gray-400 text-sm">
            Discover, preview, and explore millions of books from around the world
          </p>
        </div>
      </footer>
    </div>
  );
}
