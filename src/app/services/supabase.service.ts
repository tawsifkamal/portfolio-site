import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project } from '../interfaces/project';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async getProjects(): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('name, description, imageUrl:image_url, linkIconSrc:link_icon_src, link, skills, prize')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }

    return data as Project[];
  }
}
