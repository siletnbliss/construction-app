import { Component, Input, signal } from '@angular/core';
import { Project } from '../../models/project';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiCarouselModule, TuiPaginationModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { TuiSvgModule } from '@taiga-ui/core';
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
    ItemDetailsComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent {
  @Input({ required: true })
  project!: Project;

  galleryIndex = signal(0);
  setGalleryIndex(index: number) {
    this.galleryIndex.set(index);
  }
}
