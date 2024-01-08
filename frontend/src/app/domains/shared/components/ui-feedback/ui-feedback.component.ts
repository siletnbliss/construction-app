import { Component, Input, computed } from '@angular/core';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiBlockStatusModule } from '@taiga-ui/layout';

@Component({
  selector: 'app-ui-feedback',
  standalone: true,
  imports: [TuiLoaderModule, TuiBlockStatusModule],
  templateUrl: './ui-feedback.component.html',
  styleUrl: './ui-feedback.component.scss',
})
export class UiFeedbackComponent {
  @Input()
  loading = false;

  @Input()
  empty = false;

  @Input()
  emptyMessage = 'Nothing found here';

  @Input()
  error = false;

  @Input()
  errorMessage = 'Sorry, something went wrong';
}
