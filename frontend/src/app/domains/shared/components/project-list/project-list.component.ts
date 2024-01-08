import { Project } from '@/shared/models/project';
import { Component, Input } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  @Input({ required: true })
  projects!: Project[];
}
