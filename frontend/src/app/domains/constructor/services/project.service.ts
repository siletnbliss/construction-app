import { environment } from '@/environments/environment';
import { Project } from '@/shared/models/project';
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
}
