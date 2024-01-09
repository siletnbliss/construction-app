import { ProjectFormComponent } from '@/constructor/components/project-form/project-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [ProjectFormComponent],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.scss',
})
export default class CreateProjectComponent {}
