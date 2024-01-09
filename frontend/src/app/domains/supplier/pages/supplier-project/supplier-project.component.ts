import { ApplicationDetailComponent } from '@/shared/components/application-detail/application-detail.component';
import { ProjectDetailComponent } from '@/shared/components/project-detail/project-detail.component';
import { UiFeedbackComponent } from '@/shared/components/ui-feedback/ui-feedback.component';
import { Application } from '@/shared/models/application';
import { Project } from '@/shared/models/project';
import { ApplicationFormComponent } from '@/supplier/components/application-form/application-form.component';
import { ApplicationService } from '@/supplier/services/application.service';
import { FetchProjectService } from '@/supplier/services/fetch-projects.service';
import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TuiSvgModule, tuiDropdownAnimation } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-supplier-project',
  standalone: true,
  imports: [
    TuiTabsModule,
    TuiSvgModule,
    ProjectDetailComponent,
    UiFeedbackComponent,
    CommonModule,
    ApplicationDetailComponent,
    ApplicationFormComponent,
  ],
  templateUrl: './supplier-project.component.html',
  styleUrl: './supplier-project.component.scss',
  animations: [tuiDropdownAnimation],
})
export default class SupplierProjectComponent {
  private projectService = inject(FetchProjectService);
  private applicationService = inject(ApplicationService);
  private router = inject(Router);
  project = signal<Project | null>(null);

  application = signal<Application | null>(null);

  loading = signal(false);
  error = signal(false);

  @Input()
  id!: string;

  @Input()
  tab?: string;

  tabsIndex = signal(0);

  setTabsIndex(index: number) {
    this.tabsIndex.set(index);
    this.router.navigate(['supplier', 'project', this.id], {
      queryParams: { tab: index },
    });
  }

  handleApplicationSubmit() {
    this.loadApplication();
  }

  private loadApplication() {
    this.applicationService.getApplication(this.id).subscribe({
      next: (value) => {
        this.application.set(value);
      },
      error: () => {
        this.error.set(true);
      },
    });
  }

  ngOnInit() {
    if (this.tab) this.setTabsIndex(parseInt(this.tab));
    this.loading.set(true);
    this.loadApplication();
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
  }
}
