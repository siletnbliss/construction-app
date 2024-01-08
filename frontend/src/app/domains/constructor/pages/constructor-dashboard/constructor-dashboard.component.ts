import { ProjectService } from '@/constructor/services/project.service';
import { UiFeedbackComponent } from '@/shared/components/ui-feedback/ui-feedback.component';
import { ProjectListComponent } from '@/shared/components/project-list/project-list.component';
import { Project } from '@/shared/models/project';
import { Component, inject, signal } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-constructor-dashboard',
  standalone: true,
  imports: [
    UiFeedbackComponent,
    ProjectListComponent,
    TuiButtonModule,
    RouterLinkWithHref,
  ],
  templateUrl: './constructor-dashboard.component.html',
  styleUrl: './constructor-dashboard.component.scss',
})
export default class ConstructorDashboardComponent {
  private projectService = inject(ProjectService);
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
