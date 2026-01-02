import React, { useState } from 'react';
import { MessageSquare, Clock, User } from 'lucide-react';
import type { Post } from '../types/type';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { formatDate } from '../utils/global';

interface PostItemProps {
  post: Post;
  onCommentAdded: (updatedPost: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onCommentAdded }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

 

const getImageUrl = () => post.imageUrl;


  const handleCommentUpdated = (updatedPost: Post) => {
    onCommentAdded(updatedPost);
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
        
     
        <div className="caption-section">
          <p className="post-caption">{post.caption}</p>
        </div>
      </div>

     
      <img
        src={getImageUrl()}
        alt={post.caption}
        className="post-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/not-found.png';
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
            onCommentAdded={(updatedPost) => {
              onCommentAdded(updatedPost);
              setShowCommentForm(false);
            }}
          />
        )}

     
        {post.comments.length > 0 && (
          <div className="comments-list">
            <h4 className="comments-title">Comments ({post.comments.length})</h4>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
                onCommentUpdated={handleCommentUpdated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;