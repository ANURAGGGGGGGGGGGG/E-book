const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1';

/**
 * Search for books using Google Books API
 * @param {string} query - Search query (e.g., "harry potter", "author:tolkien", "isbn:9780123456789")
 * @param {number} startIndex - Starting index for pagination (default: 0)
 * @param {number} maxResults - Maximum number of results (default: 10, max: 40)
 * @returns {Promise<Object>} Search results from Google Books API
 */
export async function searchBooks(query, startIndex = 0, maxResults = 10) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const url = `${GOOGLE_BOOKS_API_BASE}/volumes?q=${encodedQuery}&startIndex=${startIndex}&maxResults=${maxResults}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}

/**
 * Get detailed information about a specific book by its ID
 * @param {string} bookId - Google Books volume ID
 * @returns {Promise<Object>} Book details from Google Books API
 */
export async function getBookById(bookId) {
  try {
    const url = `${GOOGLE_BOOKS_API_BASE}/volumes/${bookId}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}

/**
 * Format book data for consistent display
 * @param {Object} book - Raw book data from Google Books API
 * @returns {Object} Formatted book data
 */
export function formatBookData(book) {
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const saleInfo = book.saleInfo || {};
  
  return {
    id: book.id,
    title: volumeInfo.title || 'Unknown Title',
    subtitle: volumeInfo.subtitle || '',
    authors: volumeInfo.authors || ['Unknown Author'],
    publisher: volumeInfo.publisher || 'Unknown Publisher',
    publishedDate: volumeInfo.publishedDate || 'Unknown Date',
    description: volumeInfo.description || 'No description available',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    language: volumeInfo.language || 'en',
    previewLink: volumeInfo.previewLink || '',
    infoLink: volumeInfo.infoLink || '',
    canonicalVolumeLink: volumeInfo.canonicalVolumeLink || '',
    thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Cover+Available',
    smallThumbnail: imageLinks.smallThumbnail || imageLinks.thumbnail || 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Cover+Available',
    isEbook: saleInfo.isEbook || false,
    saleability: saleInfo.saleability || 'NOT_FOR_SALE',
    buyLink: saleInfo.buyLink || '',
    price: saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : null,
    isbn10: volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || '',
    isbn13: volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || '',
  };  
}

/**
 * Get popular books by category
 * @param {string} category - Book category (e.g., "fiction", "science", "history")
 * @param {number} maxResults - Maximum number of results (default: 10)
 * @returns {Promise<Object>} Search results for the category
 */
export async function getBooksByCategory(category, maxResults = 10) {
  return searchBooks(`subject:${category}`, 0, maxResults);
}

/**
 * Get books by a specific author
 * @param {string} author - Author name
 * @param {number} maxResults - Maximum number of results (default: 10)
 * @returns {Promise<Object>} Search results for the author
 */
export async function getBooksByAuthor(author, maxResults = 10) {
  return searchBooks(`inauthor:${author}`, 0, maxResults);
}