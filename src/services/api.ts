import axios from 'axios';
import type {
  ApiResponse,
  CreatePostResponse,
  GetPostsResponse,
  AddCommentResponse
} from '../types/post';

const API_BASE_URL =
  import.meta.env.VITE_API_URL;

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
  // Create post
  createPost: async (
    formData: FormData
  ): Promise<ApiResponse<CreatePostResponse>> => {
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get all posts
  getPosts: async (): Promise<ApiResponse<GetPostsResponse>> => {
    return api.get('/posts');
  },

  // Get single post  
  getSinglePost: async (
    postId: string
  ): Promise<ApiResponse<{ post: any }>> => {
    return api.get(`/posts/${postId}`);
  },

  // Add comment
  addComment: async (
    postId: string,
    text: string
  ): Promise<ApiResponse<AddCommentResponse>> => {
    return api.post(`/posts/${postId}/comments`, { text });
  },
};

// Health check
export const checkApiHealth = async (): Promise<
  ApiResponse<{ message: string; timestamp: string }>
> => {
  return api.get('/health');
};

export default api;
