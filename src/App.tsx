import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import PostForm from './components/PostForm';
import PostFeed from './components/PostFeed';
import './index.css';
import Layout from './common/Layout';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
   <Layout>
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
       </Layout>
    </div>
  );
}

export default App;
