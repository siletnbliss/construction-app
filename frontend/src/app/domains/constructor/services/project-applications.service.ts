import { environment } from '@/environments/environment';
import { Application } from '@/shared/models/application';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ProjectApplicationsService {
  constructor(private http: HttpClient) {}

  getApplications(projectId: string) {
    return this.http.get<Application[]>(
      `${API_URL}/construction/project/${projectId}/application`
    );
  }
}
