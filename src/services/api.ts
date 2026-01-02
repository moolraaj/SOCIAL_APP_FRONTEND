import axios from 'axios';
import type {
  ApiResponse,
  CreatePostResponse,
  GetPostsResponse,
  AddCommentResponse,
  Post
} from '../types/type';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const postApi = {
  // Create post api
  createPost: async (
    formData: FormData
  ): Promise<ApiResponse<CreatePostResponse>> => {
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get all posts api
  getPosts: async (): Promise<ApiResponse<GetPostsResponse>> => {
    return api.get('/posts');
  },

  // Get single post api 
  getSinglePost: async (
    postId: string
  ): Promise<ApiResponse<{ post: Post }>> => {
    return api.get(`/posts/${postId}`);
  },

  // Add comment api
  addComment: async (
    postId: string,
    text: string
  ): Promise<ApiResponse<AddCommentResponse>> => {
    return api.post(`/posts/${postId}/comments`, { text });
  },

  // Update comment
  updateComment: async (
    postId: string,
    commentId: string,
    text: string
  ): Promise<ApiResponse<{ post: Post }>> => {
    return api.patch(`/posts/${postId}/comments/${commentId}`, { text });
  },

  // Delete comment
  deleteComment: async (
    postId: string,
    commentId: string
  ): Promise<ApiResponse<{ post: Post }>> => {
    return api.delete(`/posts/${postId}/comments/${commentId}`);
  },

  // Update post caption
  updatePost: async (
    postId: string,
    caption: string
  ): Promise<ApiResponse<{ post: Post }>> => {
    return api.patch(`/posts/${postId}`, { caption });
  },
};

export default api;