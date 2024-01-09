import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiErrorModule } from '@taiga-ui/core';
import {
  TuiFileLike,
  TuiFieldErrorPipeModule,
  TuiInputFilesModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [
    TuiInputFilesModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent {
  @Input({ required: true })
  control = new FormControl<File[]>([]);
  @Input()
  link!: string;
  @Input()
  label!: string;
  rejectedFiles: readonly TuiFileLike[] = [];

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  removeFile({ name }: File): void {
    this.control.setValue(
      this.control.value?.filter((current: File) => current.name !== name) ?? []
    );
  }

  clearRejected({ name }: TuiFileLike): void {
    this.rejectedFiles = this.rejectedFiles.filter(
      (rejected) => rejected.name !== name
    );
  }
}
