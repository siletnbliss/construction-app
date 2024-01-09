import { Injectable, signal } from '@angular/core';
import { ProjectFormValues } from '../components/project-form/project-form.model';
import { ProjectItem } from '@/shared/models/project';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService {
  private projectForm = signal<ProjectFormValues | null>(null);
  private itemsForm = signal<ProjectItem[] | null>(null);
  constructor() {}

  setProject(form: any) {
    this.projectForm.set(form);
  }

  getProject() {
    return this.projectForm();
  }

  setItems(form: any) {
    this.itemsForm.set(form);
  }

  getItems() {
    return this.itemsForm();
  }

  clearForms() {
    this.setProject(null);
    this.setItems(null);
  }
}
