import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {   MessageSquare, PlusSquare } from 'lucide-react';

import PostForm from './components/PostForm';
import PostFeed from './components/PostFeed';
import './index.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
     
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="logo-section">
            <div className="logo-icon">
              <MessageSquare size={24} />
            </div>
            <div>
              <h1 className="app-title">Social Media App</h1>
              <p className="app-subtitle">View All Posts</p>
            </div>
          </Link>

          
          <nav className="header-features">
            <Link to="/" className="feature-item">
              <MessageSquare size={20} />
              <span>All Posts</span>
            </Link>

            <Link to="/create-post" className="feature-item">
              <PlusSquare size={20} />
              <span>Create Post</span>
            </Link>
          </nav>
        </div>
      </header>



      
      <main className="main-content">
        <div className="content-wrapper">
          <Routes>
         
            <Route path="/" element={<PostFeed key={refreshKey} />} />

            
            <Route
              path="/create-post"
              element={<PostForm onPostCreated={handlePostCreated} />}
            />

         
            <Route
              path="*"
              element={
                <div className="text-center py-20 text-gray-600">
                  404 – Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </main>

      

       
      <footer className="app-footer">
        <div className="content-wrapper">
          <p className="footer-text">
            Mini Social Media App • Assignment Submission
            <br />
            Built with React, TypeScript, Custom CSS & Node.js
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
