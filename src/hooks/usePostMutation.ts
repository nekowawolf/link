import { useState } from 'react';
import { linkService } from '@/services/linkService';
import { CreatePostRequest, UpdatePostRequest } from '@/types/link';

interface UsePostMutationReturn {
  createPost: (data: CreatePostRequest) => Promise<string | null>;
  updatePost: (id: string, data: UpdatePostRequest) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function usePostMutation(): UsePostMutationReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (data: CreatePostRequest): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await linkService.createPost(data);
      return result.inserted_id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, data: UpdatePostRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await linkService.updatePost(id, data);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update post';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await linkService.deletePost(id);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete post';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPost,
    updatePost,
    deletePost,
    isLoading,
    error,
  };
}