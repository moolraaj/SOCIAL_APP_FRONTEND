import React, { useState, useRef } from 'react';
import { Upload, Send, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';

import { postApi } from '../services/api';
import type { PostFormProps } from '../types/type';


const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const navigate = useNavigate();

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        setError('Only JPEG and PNG images are allowed');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setImage(file);
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!image) {
    setError('Please select an image');
    return;
  }

  if (!caption.trim()) {
    setError('Please add a caption');
    return;
  }

  setIsLoading(true);
  setError('');

  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    await postApi.createPost(formData);

   
    setCaption('');
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

   
    onPostCreated();
    navigate('/');
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to create post');
  } finally {
    setIsLoading(false);
  }
};


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="post-form">
      <h2 className="form-title">
        <Upload size={24} />
        Create New Post
      </h2>

      <form onSubmit={handleSubmit}>
    
        <div className="form-group">
          <div 
            className="image-upload-area"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png"
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="image-preview-container">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="image-preview"
                />
                <p className="upload-placeholder">Click to change image</p>
              </div>
            ) : (
              <>
                <ImageIcon className="upload-icon" />
                <p className="upload-placeholder">
                  Click to upload an image
                </p>
                <p className="upload-placeholder">
                  JPEG or PNG (Max 5MB)
                </p>
              </>
            )}
          </div>
        </div>

     
        <div className="form-group">
          <label className="form-label">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What's on your mind?"
            className="form-textarea"
            rows={3}
            maxLength={500}
          />
          <div className="char-counter">
            {caption.length}/500
          </div>
        </div>

   
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

 
        <button
          type="submit"
          disabled={isLoading}
          className="primary-button"
        >
          {isLoading ? (
            <>
              <div className="loading-spinner small"></div>
              Uploading...
            </>
          ) : (
            <>
              <Send size={20} />
              Share Post
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PostForm;