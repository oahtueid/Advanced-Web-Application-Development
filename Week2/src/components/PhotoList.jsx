import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const observer = useRef();

  const LIMIT = 30;
  // Fetch photos from Lorem Picsum API
  const fetchPhotos = useCallback(async (pageNum) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      // Lorem Picsum API endpoint: https://picsum.photos/v2/list
      // Parameters: page (for pagination) and limit (number of photos per page)
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=${LIMIT}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }

      const data = await response.json();
      
      // If no photos returned, we've reached the end
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prevPhotos => {
          // Avoid duplicates by checking if photo already exists
          const existingIds = new Set(prevPhotos.map(p => p.id));
          const newPhotos = data.filter(photo => !existingIds.has(photo.id));
          return [...prevPhotos, ...newPhotos];
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initial photos on component mount
  useEffect(() => {
    fetchPhotos(page);
  }, [page, fetchPhotos]);

  // Intersection Observer callback for infinite scroll
  const lastPhotoRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          return nextPage;
        });
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchPhotos]);

  if (error && photos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">⚠️ Error: {error}</p>
          <button
            onClick={() => {
              setError(null);
              setPage(1);
              setPhotos([]);
              fetchPhotos(1);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => {
          const isLastPhoto = photos.length === index + 1;
          
          return (
            <Link
              key={photo.id}
              to={`/photos/${photo.id}`}
              ref={isLastPhoto ? lastPhotoRef : null}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                <img
                  src={`https://picsum.photos/id/${photo.id}/400/400`}
                  alt={`Photo by ${photo.author}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {photo.author}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {photo.width} × {photo.height}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Loading Indicator */}
      {loading && <Loading text="Loading more photos..." />}

      {/* No More Photos Message */}
      {!hasMore && photos.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">
            End of gallery. No more photos to load.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && photos.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No photos found.</p>
        </div>
      )}
    </div>
  );
};

export default PhotoList;
