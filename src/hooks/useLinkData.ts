import { useState, useEffect, useCallback } from 'react';
import { linkService } from '@/services/linkService';
import { Profile, LinkPost } from '@/types/link';

interface UseLinkDataReturn {
  profile: Profile | null;
  posts: LinkPost[];
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
  refetchPosts: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

export function useLinkData(): UseLinkDataReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<LinkPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await linkService.getProfile();
      setProfile(data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await linkService.getAllPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchProfile(), fetchPosts()]);
    setLoading(false);
  }, [fetchProfile, fetchPosts]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    profile,
    posts,
    loading,
    error,
    refetchProfile: fetchProfile,
    refetchPosts: fetchPosts,
    refetchAll: fetchAll,
  };
}