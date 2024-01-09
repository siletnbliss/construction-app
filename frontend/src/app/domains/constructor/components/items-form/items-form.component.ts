import { CreateProjectService } from '@/constructor/services/create-project.service';
import { ProjectService } from '@/constructor/services/project.service';
import { CreateProject, ProjectItem } from '@/shared/models/project';
import { parseHttpError } from '@/shared/utils/parse-http-error';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import {
  TuiAlertModule,
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiTextfieldControllerModule,
  TuiTextfieldPrefixDirective,
} from '@taiga-ui/core';
import {
  TuiElasticContainerModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
} from '@taiga-ui/kit';

type FormGroupControls = {
  [K in keyof ProjectItem]: FormControl<ProjectItem[K] | null>;
};

@Component({
  selector: 'app-items-form',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiGroupModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    RouterLinkWithHref,
    TuiCurrencyPipeModule,
    CommonModule,
    TuiElasticContainerModule,
    TuiAlertModule,
  ],
  templateUrl: './items-form.component.html',
  styleUrl: './items-form.component.scss',
})
export class ItemsFormComponent {
  private createProjectService = inject(CreateProjectService);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private alertService = inject(TuiAlertService);

  itemControls = new FormArray<FormGroup<FormGroupControls>>([
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(0.1)]),
    }),
  ]);

  loading = signal(false);

  addMore() {
    this.itemControls.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        quantity: new FormControl(0, [
          Validators.required,
          Validators.min(0.1),
        ]),
        unitPrice: new FormControl(0, [
          Validators.required,
          Validators.min(0.1),
        ]),
      })
    );
  }

  remove(index: number) {
    this.itemControls.removeAt(index);
  }

  ngOnInit() {
    const initValues = this.createProjectService.getItems();
    const initProject = this.createProjectService.getProject();
    if (!initProject) {
      this.router.navigate(['construction', 'create-project']);
    } else {
      if (initValues) {
        this.itemControls.clear();
        initValues.forEach((value) => {
          this.itemControls.push(
            new FormGroup({
              name: new FormControl(value.name, [Validators.required]),
              quantity: new FormControl(value.quantity, [
                Validators.required,
                Validators.min(0.1),
              ]),
              unitPrice: new FormControl(value.unitPrice, [
                Validators.required,
                Validators.min(0.1),
              ]),
            })
          );
        });
      }
    }
  }

  onBack() {
    this.createProjectService.setItems(this.itemControls.value);
    this.router.navigate(['construction', 'create-project']);
  }

  private parseForm() {
    const project = this.createProjectService.getProject();

    const dto: CreateProject = {
      ...(project as Omit<CreateProject, 'items' | 'startDate' | 'finishDate'>),
      startDate: project?.startDate
        ?.toUtcNativeDate()
        .toISOString()
        .split('T')
        .at(0) as string,
      finishDate: project?.finishDate
        ?.toUtcNativeDate()
        .toISOString()
        .split('T')
        .at(0) as string,
      images: project?.images as File[],
      items: this.itemControls.value as Required<ProjectItem>[],
    };
    return dto;
  }

  handleSubmit() {
    this.loading.set(true);

    this.projectService.createProjects(this.parseForm()).subscribe({
      next: () => {
        this.loading.set(false);
        this.alertService
          .open('Success', {
            label: 'Project Created',
            status: 'success',
          })
          .subscribe({
            complete: () => {
              this.createProjectService.clearForms();
              this.router.navigate(['construction']);
            },
          });
      },
      error: (err) => {
        this.loading.set(false);

        this.alertService.open('Error', {
          label: parseHttpError(err, {
            400: 'Check your form inputs and submit again',
          }),
          status: 'error',
        });
      },
    });
  }
}
