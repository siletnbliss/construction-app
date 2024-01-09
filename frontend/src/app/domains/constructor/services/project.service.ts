import { environment } from '@/environments/environment';
import { CreateProject, Project } from '@/shared/models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(`${API_URL}/construction/project`);
  }

  getSingleProject(projectId: string) {
    return this.http.get<Project>(
      `${API_URL}/construction/project/${projectId}`
    );
  }

  createProjects(dto: CreateProject) {
    const formData = new FormData();
    Object.entries(dto).forEach(([key, value]) => {
      if (['images', 'items'].includes(key)) {
        return;
      }
      formData.append(key, value);
    });
    formData.append('items', JSON.stringify(dto.items));
    dto.images.forEach((img) => {
      formData.append('images', img);
    });
    return this.http.post<Project>(`${API_URL}/construction/project`, formData);
  }
}
