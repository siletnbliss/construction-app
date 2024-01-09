import { Project, ProjectItem } from '@/shared/models/project';
import { parseHttpError } from '@/shared/utils/parse-http-error';
import { ApplicationService } from '@/supplier/services/application.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';
import {
  TuiAlertModule,
  TuiAlertService,
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiElasticContainerModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiMultiSelectModule,
  TuiTagModule,
} from '@taiga-ui/kit';

interface ControlValues {
  item: ProjectItem;
  unitPrice?: number;
}

type FormGroupControls = {
  [K in keyof ControlValues]: FormControl<ControlValues[K] | null>;
};

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    FormsModule,
    TuiInputModule,
    TuiInputNumberModule,
    ReactiveFormsModule,
    RouterModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiErrorModule,
    TuiButtonModule,
    TuiTagModule,
    TuiFieldErrorPipeModule,
    TuiTextfieldControllerModule,
    TuiElasticContainerModule,
    CommonModule,
    TuiCurrencyPipeModule,
    TuiLabelModule,
    TuiAlertModule,
  ],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent {
  private applicationService = inject(ApplicationService);
  private alertService = inject(TuiAlertService);

  @Input({ required: true })
  project!: Project;

  @Output()
  onSuccess = new EventEmitter<void>();

  loading = signal(false);

  selectedItems = new FormControl<ProjectItem[]>(
    [],
    [Validators.required, Validators.minLength(1)]
  );
  form = new FormArray<FormGroup<FormGroupControls>>(
    [],
    [Validators.required, Validators.minLength(1)]
  );

  ngOnInit() {
    this.selectedItems.valueChanges.subscribe({
      next: (value) => {
        const selectLength = value?.length || 0;
        // remove item from form
        if (selectLength < this.form.length) {
          const itemIds = value?.map((v) => v.id) || [];
          const deleteIndex = this.form.controls
            .filter((c) => !!c.value.item?.id)
            .findIndex(
              (control) => !itemIds.includes(control.value.item?.id as string)
            );
          this.form.removeAt(deleteIndex);
        } else {
          const lastValue = value?.at(value.length - 1);
          if (lastValue)
            this.form.push(
              new FormGroup<FormGroupControls>({
                item: new FormControl(lastValue),
                unitPrice: new FormControl<number | undefined>(undefined, []),
              })
            );
        }
      },
    });
  }
  stringify(item: ProjectItem): string {
    return item.name;
  }

  handleSubmit() {
    this.loading.set(true);

    this.applicationService
      .createApplication(this.project.id, {
        items: this.form.value.map((value) => ({
          itemId: value.item?.id as string,
          unitPrice: value.unitPrice,
        })),
      })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.alertService
            .open('Success', {
              label: 'Application Submitted',
              status: 'success',
            })
            .subscribe();
          this.onSuccess.emit();
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
