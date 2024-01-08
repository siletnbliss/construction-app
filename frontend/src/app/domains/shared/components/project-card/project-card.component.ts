import { Project } from '@/shared/models/project';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLinkWithHref, TuiSvgModule, TuiButtonModule, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input({ required: true })
  project!: Project;
}
