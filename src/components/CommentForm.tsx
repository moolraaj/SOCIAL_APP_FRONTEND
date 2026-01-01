import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { postApi } from '../services/api';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await postApi.addComment(postId, text);
      setText('');
      onCommentAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add comment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div className="form-group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="form-textarea"
          rows={2}
          maxLength={300}
        />
        <div className="char-counter">
          {text.length}/300
        </div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="primary-button"
        style={{ width: 'auto' }}
      >
        {isLoading ? (
          <div className="loading-spinner small" style={{ width: '20px', height: '20px' }}></div>
        ) : (
          <>
            <Send size={20} />
            Add Comment
          </>
        )}
      </button>
    </form>
  );
};

export default CommentForm;