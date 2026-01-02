import React, { useState } from 'react';
import { MessageSquare, Clock, User } from 'lucide-react';
import type { Post } from '../types/type';
import CommentForm from './CommentForm';
import { formatDate } from '../utils/global';


interface PostItemProps {
  post: Post;
  onCommentAdded: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onCommentAdded }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const getImageUrl = () => {
    if (post.imageUrl.startsWith('http')) return post.imageUrl;
    return `${API_URL}${post.imageUrl}`;
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <h3>Anonymous User</h3>
            <div className="post-time">
              <Clock size={16} />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <p className="post-caption">{post.caption}</p>
      </div>

      
      <img 
        src={getImageUrl()} 
        alt={post.caption}
        className="post-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
        }}
      />

     
      <div className="comments-section">
        <button
          className="comments-toggle"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <MessageSquare size={20} />
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
          {showCommentForm ? ' ↑' : ' ↓'}
        </button>

        {showCommentForm && (
          <CommentForm 
            postId={post._id} 
            onCommentAdded={() => {
              onCommentAdded();
              setShowCommentForm(false);
            }}
          />
        )}

      
        {post.comments.length > 0 && (
          <div className="comments-list">
            <h4 className="comments-title">Comments</h4>
            {post.comments.map((comment) => (
              <div key={comment._id || comment.text} className="comment-item">
                <div className="comment-content">
                  <div className="comment-avatar">
                    <User size={16} />
                  </div>
                  <div className="comment-text">
                    <p className="comment-body">{comment.text}</p>
                    <div className="comment-time">
                      <Clock size={12} />
                      <span>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;