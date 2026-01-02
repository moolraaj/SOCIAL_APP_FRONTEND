import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, Clock, User } from 'lucide-react';
import { postApi } from '../services/api';
import type {  CommentItemProps } from '../types/type';
import { formatDate } from '../utils/global';


const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, onCommentUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editedText, setEditedText] = useState(comment.text);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    if (!editedText.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    if (editedText === comment.text) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await postApi.updateComment(postId, comment._id, editedText);
      onCommentUpdated(response.data.post);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update comment');
    } finally {
      setIsLoading(false);
    }
  };

const handleDelete = async () => {
  setIsDeleting(true);
  setError('');

  try {
    const response = await postApi.deleteComment(postId, comment._id);
    onCommentUpdated(response.data.post);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to delete comment');
    setIsDeleting(false);
  }
};


  const handleCancel = () => {
    setEditedText(comment.text);
    setIsEditing(false);
    setError('');
  };

  if (isEditing) {
    return (
      <div className="comment-item editing">
        <div className="comment-content">
          <div className="comment-avatar">
            <User size={16} />
          </div>
          <div className="comment-text">
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="form-textarea"
              rows={2}
              maxLength={300}
              disabled={isLoading}
              autoFocus
            />
            <div className="char-counter">{editedText.length}/300</div>
            
            {error && <div className="error-message small">{error}</div>}
            
            <div className="edit-actions" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
              <button
                onClick={handleUpdate}
                disabled={isLoading || !editedText.trim()}
                className="primary-button small"
                style={{ padding: '6px 12px', fontSize: '14px' }}
              >
                <Check size={16} />
                {isLoading ? 'Saving...' : 'Save'}
              </button>
              
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="secondary-button"
                style={{ padding: '6px 12px', fontSize: '14px' }}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="comment-item">
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
          
          <div className="comment-actions" style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsEditing(true)}
              className="secondary-button small"
              style={{ padding: '4px 8px', fontSize: '12px' }}
              title="Edit comment"
            >
              <Edit2 size={14} />
              
            </button>
            
<button
  onClick={handleDelete}
  disabled={isDeleting || isLoading}
  className="danger-button small"
  style={{ padding: '4px 8px', fontSize: '12px' }}
  title="Delete comment"
>
  {isDeleting ? (
    <>Deleting...</>
  ) : (
    <Trash2 size={14} />
  )}
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;