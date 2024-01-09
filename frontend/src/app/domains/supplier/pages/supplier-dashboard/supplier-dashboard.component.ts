import { ProjectListComponent } from '@/shared/components/project-list/project-list.component';
import { UiFeedbackComponent } from '@/shared/components/ui-feedback/ui-feedback.component';
import { Project } from '@/shared/models/project';
import { FetchProjectService } from '@/supplier/services/fetch-projects.service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-supplier-dashboard',
  standalone: true,
  imports: [ProjectListComponent, UiFeedbackComponent],
  templateUrl: './supplier-dashboard.component.html',
  styleUrl: './supplier-dashboard.component.scss',
})
export default class SupplierDashboardComponent {
  private projectService = inject(FetchProjectService);
  projects = signal<Project[]>([]);
  loading = signal(false);
  error = signal(false);
  ngOnInit() {
    this.loading.set(true);
    this.projectService.getProjects().subscribe({
      next: (value) => {
        this.loading.set(false);
        this.projects.set(value);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
  }
}
