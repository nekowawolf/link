import { apiService } from './apiService';
import { Profile, LinkPost, ApiResponse } from '@/types/link';

class LinkService {
  private readonly PROFILE_ENDPOINT = '/profilelink';
  private readonly POSTS_ENDPOINT = '/postslink';

  /* Fetches the user profile information from the API */
  async getProfile(): Promise<Profile> {
    const response = await apiService.get<Profile>(this.PROFILE_ENDPOINT);
    return response;
  }

  /* Retrieves post stats from the API */
  async getPostStats(): Promise<Record<string, number>> {
    const response = await apiService.get<ApiResponse<Record<string, number>>>(`${this.POSTS_ENDPOINT}/stats`);
    return response.data || { 'all': 0, 'AI Prompts': 0, 'Templates': 0, 'projects': 0 };
  }

  /* Retrieves paginated posts from the API */
  async getPosts(page: number = 1, limit: number = 5, category?: string, search?: string): Promise<LinkPost[]> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const response = await apiService.get<ApiResponse<LinkPost[]>>(`${this.POSTS_ENDPOINT}?${params.toString()}`);
    return response.data || [];
  }

}

export const linkService = new LinkService();