import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchPhotoDetail = async () => {
      setLoading(true);
      setError(null);
      setImageLoaded(false);

      try {
        // Fetch photo details from Lorem Picsum API
        const response = await fetch(`https://picsum.photos/id/${id}/info`);
        
        if (!response.ok) {
          throw new Error('Photo not found');
        }

        const data = await response.json();
        setPhoto(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching photo details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPhotoDetail();
    }
  }, [id]);

  if (loading) {
    return <Loading text="Loading photo details..." fullScreen={true} />;
  }

  if (error || !photo) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            ⚠️ {error || 'Photo not found'}
          </p>
          <Link
            to="/photos"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/photos')}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Gallery
        </button>
      </div>

      {/* Photo Detail Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Full-Size Image */}
        <div className="relative bg-gray-200" style={{ paddingBottom: '66.67%' }}>
          {!imageLoaded && <Loading text="" absolute={true} />}
          <img
            src={`https://picsum.photos/id/${photo.id}/1200/800`}
            alt={`Photo by ${photo.author}`}
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Photo Information */}
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            {/* Title/ID */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                Title
              </h2>
              <p className="text-2xl font-bold text-gray-900">
                #{photo.id}
              </p>
            </div>

            {/* Author */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                Photographer
              </h2>
              <p className="text-xl font-semibold text-gray-900">
                📷 {photo.author}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
                Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {photo.description || 
                  `A stunning photograph captured by ${photo.author}. This image showcases exceptional composition and artistic vision, available through the Lorem Picsum photo library.`}
              </p>
            </div>

            {/* Dimensions */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Dimensions</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {photo.width} × {photo.height}
                </p>
              </div>
            </div>

            {/* External Link */}
            {photo.url && (
              <div className="pt-4">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  View on Unsplash
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
