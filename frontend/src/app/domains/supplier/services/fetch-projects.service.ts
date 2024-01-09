import { environment } from '@/environments/environment';
import { CreateProject, Project } from '@/shared/models/project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class FetchProjectService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(`${API_URL}/provider/project`);
  }

  getSingleProject(projectId: string) {
    return this.http.get<Project>(`${API_URL}/provider/project/${projectId}`);
  }
}
