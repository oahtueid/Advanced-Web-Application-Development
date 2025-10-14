import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/photos">
              <h1 className="text-3xl font-bold text-gray-900">
                  📷 Photo Gallery
              </h1>
            </Link>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/photos" replace />} />
            <Route path="/photos" element={<PhotoList />} />
            <Route path="/photos/:id" element={<PhotoDetail />} />
            <Route path="*" element={<PhotoList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
