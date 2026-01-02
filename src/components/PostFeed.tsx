import React, { useEffect, useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import type { Post } from '../types/type';
import { postApi } from '../services/api';
import PostItem from './PostItem';

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await postApi.getPosts();
      setPosts(response.data.posts);
    } catch {
      setError('Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  
  const handleCommentAdded = (updatedPost: Post) => {
    setPosts(prev =>
      prev.map(post =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message text-center">
        <AlertCircle size={48} className="m-auto mb-4" />
        <h3 className="mb-2">Unable to load posts</h3>
        <p className="mb-4">{error}</p>
        <button onClick={fetchPosts} className="secondary-button m-auto">
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="posts-feed">
      <div className="feed-header">
        <h2 className="feed-title">Recent Posts</h2>
        <button onClick={fetchPosts} className="secondary-button">
          <RefreshCw size={20} />
          Refresh
        </button>
      </div>

      <div className="posts-list">
        {posts.map(post => (
          <PostItem
            key={post._id}
            post={post}
            onCommentAdded={handleCommentAdded}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
