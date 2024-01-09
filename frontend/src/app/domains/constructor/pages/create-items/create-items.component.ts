import { ItemsFormComponent } from '@/constructor/components/items-form/items-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-items',
  standalone: true,
  imports: [ItemsFormComponent],
  templateUrl: './create-items.component.html',
  styleUrl: './create-items.component.scss',
})
export default class CreateItemsComponent {}
