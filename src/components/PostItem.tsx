import React, { useState } from 'react';
import { MessageSquare, Clock, User, Edit2, Check, X } from 'lucide-react';
import type { Post } from '../types/type';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { formatDate } from '../utils/global';
import { postApi } from '../services/api';

interface PostItemProps {
  post: Post;
  onCommentAdded: (updatedPost: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onCommentAdded }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const [captionError, setCaptionError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const getImageUrl = () => {
    if (post.imageUrl.startsWith('http')) return post.imageUrl;
    return `${API_URL}${post.imageUrl}`;
  };

  const handleCaptionUpdate = async () => {
    if (!editedCaption.trim()) {
      setCaptionError('Caption cannot be empty');
      return;
    }

    if (editedCaption === post.caption) {
      setIsEditingCaption(false);
      return;
    }

    setIsCaptionLoading(true);
    setCaptionError('');

    try {
      const response = await postApi.updatePost(post._id, editedCaption);
      onCommentAdded(response.data.post);
      setIsEditingCaption(false);
    } catch (err: any) {
      setCaptionError(err.response?.data?.message || 'Failed to update caption');
    } finally {
      setIsCaptionLoading(false);
    }
  };

  const handleCaptionCancel = () => {
    setEditedCaption(post.caption);
    setIsEditingCaption(false);
    setCaptionError('');
  };

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
        
        {/* Editable Caption */}
        <div className="caption-editor">
          {isEditingCaption ? (
            <div>
              <textarea
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
                className="form-textarea"
                rows={2}
                maxLength={500}
                disabled={isCaptionLoading}
                autoFocus
                style={{ marginBottom: '8px' }}
              />
              <div className="char-counter">{editedCaption.length}/500</div>
              
              {captionError && <div className="error-message small">{captionError}</div>}
              
              <div className="edit-actions" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCaptionUpdate}
                  disabled={isCaptionLoading || !editedCaption.trim()}
                  className="primary-button small"
                  style={{ padding: '6px 12px', fontSize: '14px' }}
                >
                  <Check size={16} />
                  {isCaptionLoading ? 'Saving...' : 'Save'}
                </button>
                
                <button
                  onClick={handleCaptionCancel}
                  disabled={isCaptionLoading}
                  className="secondary-button"
                  style={{ padding: '6px 12px', fontSize: '14px' }}
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p className="post-caption">{post.caption}</p>
              <button
                onClick={() => setIsEditingCaption(true)}
                className="secondary-button small"
                style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '10px' }}
                title="Edit caption"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Image */}
      <img
        src={getImageUrl()}
        alt={post.caption}
        className="post-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/not-found.png';
        }}
      />

      {/* Comments Section */}
      <div className="comments-section">
        <button
          className="comments-toggle"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          <MessageSquare size={20} />
          {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
          {showCommentForm ? ' ↑' : ' ↓'}
        </button>

        {/* Comment Form */}
        {showCommentForm && (
          <CommentForm
            postId={post._id}
            onCommentAdded={(updatedPost) => {
              onCommentAdded(updatedPost);
              setShowCommentForm(false);
            }}
          />
        )}

        {/* Comments List */}
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