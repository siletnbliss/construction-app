import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Project } from '../../models/project';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiBadgeModule,
  TuiCarouselModule,
  TuiPaginationModule,
} from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    TuiCarouselModule,
    TuiTableModule,
    TuiPaginationModule,
    TuiSvgModule,
    CommonModule,
    TuiBadgeModule,
    ItemDetailsComponent,
    TuiButtonModule,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  @Input({ required: true })
  project!: Project;

  @Input({ required: true })
  cta!: string;

  @Output()
  onCta = new EventEmitter<void>();

  galleryIndex = signal(0);

  handleCta() {
    this.onCta.emit();
  }

  setGalleryIndex(index: number) {
    this.galleryIndex.set(index);
  }
}
