import { apiService } from './apiService';
import { Profile, LinkPost, CreatePostRequest, UpdatePostRequest, ApiResponse } from '@/types/link';

class LinkService {
  private readonly PROFILE_ENDPOINT = '/profilelink';
  private readonly POSTS_ENDPOINT = '/postslink';

  /* Fetches the user profile information from the API */
  async getProfile(): Promise<Profile> {
    const response = await apiService.get<Profile>(this.PROFILE_ENDPOINT);
    return response;
  }

  /* Updates the user profile with new data */
  async updateProfile(profileData: Partial<Profile>): Promise<ApiResponse> {
    const response = await apiService.put<ApiResponse>(this.PROFILE_ENDPOINT, profileData);
    return response;
  }

  /* Retrieves all posts from the API */
  async getAllPosts(): Promise<LinkPost[]> {
    const response = await apiService.get<ApiResponse<LinkPost[]>>(this.POSTS_ENDPOINT);
    return response.data || [];
  }

  /* Fetches a single post by ID and automatically increments view count */
  async getPostById(id: string): Promise<LinkPost> {
    const response = await apiService.get<ApiResponse<LinkPost>>(`${this.POSTS_ENDPOINT}/${id}`);
    return response.data as LinkPost;
  }

  /* Creates a new post with the provided data */
  async createPost(postData: CreatePostRequest): Promise<{ inserted_id: string }> {
    const response = await apiService.post<ApiResponse & { inserted_id: string }>(this.POSTS_ENDPOINT, postData);
    return { inserted_id: response.inserted_id || '' };
  }

  /* Updates an existing post by ID */
  async updatePost(id: string, postData: UpdatePostRequest): Promise<ApiResponse> {
    const response = await apiService.put<ApiResponse>(`${this.POSTS_ENDPOINT}/${id}`, postData);
    return response;
  }

  /* Deletes a post by ID */
  async deletePost(id: string): Promise<ApiResponse> {
    const response = await apiService.delete<ApiResponse>(`${this.POSTS_ENDPOINT}/${id}`);
    return response;
  }
}

export const linkService = new LinkService();