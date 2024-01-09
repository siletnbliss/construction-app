import { CreateProjectService } from '@/constructor/services/create-project.service';
import { FileInputComponent } from '@/shared/components/file-input/file-input.component';
import { DateValidators } from '@/shared/validators/date.validator';
import { maxFilesLength } from '@/shared/validators/max-files.validator';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TuiDay } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiLabelModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiFilesModule,
  TuiInputDateModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    TuiButtonModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiFilesModule,
    TuiTextareaModule,
    TuiGroupModule,
    TuiInputDateModule,
    TuiInputFilesModule,
    CommonModule,
    ReactiveFormsModule,
    FileInputComponent,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  private createProjectService = inject(CreateProjectService);
  private router = inject(Router);

  form = new FormGroup(
    {
      title: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      startDate: new FormControl(TuiDay.currentLocal(), [Validators.required]),
      finishDate: new FormControl(TuiDay.currentLocal(), [Validators.required]),
      images: new FormControl<File[]>(
        [],
        [maxFilesLength(5), Validators.minLength(1), Validators.required]
      ),
    },
    { validators: [DateValidators.greaterThan('startDate', 'finishDate')] }
  );

  ngOnInit() {
    const prevForm = this.createProjectService.getProject();
    if (prevForm) this.form.setValue(prevForm);
  }

  handleSubmit() {
    this.createProjectService.setProject(this.form.value);
    this.router.navigate(['construction', 'create-project', 'items']);
  }
}
