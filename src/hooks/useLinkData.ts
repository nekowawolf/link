import { useState, useEffect, useCallback } from 'react';
import { linkService } from '@/services/linkService';
import { Profile, LinkPost } from '@/types/link';

interface UseLinkDataReturn {
  profile: Profile | null;
  posts: LinkPost[];
  stats: Record<string, number>;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  page: number;
  refetchProfile: () => Promise<void>;
  refetchPosts: () => Promise<void>;
  loadMore: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

export function useLinkData(activeTab: string = 'all', searchQuery: string = ''): UseLinkDataReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<LinkPost[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({ 'all': 0, 'AI Prompts': 0, 'Templates': 0, 'projects': 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const LIMIT = 5;

  const fetchStats = useCallback(async () => {
    try {
      const data = await linkService.getPostStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, []);

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
      setPage(1);
      const data = await linkService.getPosts(1, LIMIT, activeTab, searchQuery);
      setPosts(data);
      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    }
  }, [activeTab, searchQuery]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await linkService.getPosts(nextPage, LIMIT, activeTab, searchQuery);
      if (data && data.length > 0) {
        setPosts((prev) => {
          // Prevent duplicates by checking post ids
          const newPosts = data.filter(d => !prev.some(p => p._id === d._id));
          return [...prev, ...newPosts];
        });
        setPage(nextPage);
        setHasMore(data.length === LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Failed to load more posts:', err);
      setError(err instanceof Error ? err.message : 'Failed to load more posts');
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, activeTab, searchQuery]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchProfile(), fetchPosts()]);
    setLoading(false);
  }, [fetchProfile, fetchPosts]);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, [fetchProfile, fetchStats]);
  
  useEffect(() => {
    setLoading(true);
    fetchPosts().finally(() => setLoading(false));
  }, [fetchPosts]);

  return {
    profile,
    posts,
    stats,
    loading,
    loadingMore,
    hasMore,
    error,
    page,
    refetchProfile: fetchProfile,
    refetchPosts: fetchPosts,
    loadMore,
    refetchAll: fetchAll,
  };
}