import type { ReactNode } from 'react';

export type Comment = {
  _id: string;
  text: string;
  createdAt: string;
  isEditing?: boolean;
};

export interface CommentItemProps {
  comment: Comment;
  postId: string;
  onCommentUpdated: (updatedPost: Post) => void;  
}

export type Post = {
  _id: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  comments: Comment[];
};

 
export type ApiResponse<T = any> = {
  status: string;
  data: T;
  results?: number;
  message?: string;
};

export type CreatePostResponse = {
  post: Post;
};

export type GetPostsResponse = {
  posts: Post[];
};

export type AddCommentResponse = {
  post: Post;
};

 
export type CreatePostFormData = {
  image: File;
  caption: string;
};

export type AddCommentFormData = {
  text: string;
};

export interface CommentFormProps {
  postId: string;
  onCommentAdded: (updatedPost?: any) => void;
}

export interface PostFormProps {
  onPostCreated: () => void;
}

export interface LayoutProps {
  children: ReactNode;
}