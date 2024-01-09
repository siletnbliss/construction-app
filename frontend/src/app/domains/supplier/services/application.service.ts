import { environment } from '@/environments/environment';
import { Application } from '@/shared/models/application';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getApplication(projectId: string) {
    return this.http.get<Application>(
      `${environment.apiUrl}/provider/project/${projectId}/application`
    );
  }
}
