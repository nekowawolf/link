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

  /* Retrieves all posts from the API */
  async getAllPosts(): Promise<LinkPost[]> {
    const response = await apiService.get<ApiResponse<LinkPost[]>>(this.POSTS_ENDPOINT);
    return response.data || [];
  }

}

export const linkService = new LinkService();