import { ProjectService } from '@/constructor/services/project.service';
import { UiFeedbackComponent } from '@/shared/components/ui-feedback/ui-feedback.component';
import { Project } from '@/shared/models/project';
import { ProjectDetailComponent } from '@/shared/components/project-detail/project-detail.component';
import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import {
  TuiSvgModule,
  tuiDropdownAnimation,
  tuiHeightCollapse,
} from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';
import { ProjectApplicationsService } from '@/constructor/services/project-applications.service';
import { Application } from '@/shared/models/application';
import { ApplicationDetailComponent } from '@/shared/components/application-detail/application-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    TuiTabsModule,
    TuiSvgModule,
    ProjectDetailComponent,
    UiFeedbackComponent,
    CommonModule,
    ApplicationDetailComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  animations: [tuiDropdownAnimation],
})
export default class ProjectComponent {
  private projectService = inject(ProjectService);
  private applicationService = inject(ProjectApplicationsService);
  private router = inject(Router);
  project = signal<Project | null>(null);

  applications = signal<Application[] | null>(null);

  loading = signal(false);
  error = signal(false);

  @Input()
  id!: string;

  @Input()
  tab?: string;

  tabsIndex = signal(0);

  setTabsIndex(index: number) {
    this.tabsIndex.set(index);
    this.router.navigate(['construction', 'project', this.id], {
      queryParams: { tab: index },
    });
  }

  ngOnInit() {
    if (this.tab) this.setTabsIndex(parseInt(this.tab));
    this.loading.set(true);
    this.projectService.getSingleProject(this.id).subscribe({
      next: (value) => {
        this.loading.set(false);
        this.project.set(value);
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      },
    });
    this.applicationService.getApplications(this.id).subscribe({
      next: (value) => {
        this.applications.set(value);
      },
      error: () => {
        this.error.set(true);
      },
    });
  }
}
