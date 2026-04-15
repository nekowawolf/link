export interface SocialLinks {
  github: string;
  twitter: string;
  tiktok: string;
  website: string;
  instagram: string;
}

export interface Profile {
  _id?: string;
  name: string;
  username: string;
  bio: string;
  avatar_url: string;
  cover_url: string;
  links: SocialLinks;
}

export interface LinkPost {
  _id: string;
  name: string;
  username: string;
  is_verified: boolean;
  caption: string;
  url?: string;
  category: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  caption: string;
  url?: string;
  category?: string;
}

export interface UpdatePostRequest {
  caption?: string;
  url?: string;
  category?: string;
}

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  inserted_id?: string;
  error?: string;
}

export type PostCategory = 'all' | 'AI Prompts' | 'Templates' | 'projects';