import { Project } from '@/shared/models/project';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiTableModule } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [TuiTableModule, CommonModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent {
  @Input({ required: true })
  project!: Project;

  columns = ['name', 'quantity', 'unitPrice'];
}
