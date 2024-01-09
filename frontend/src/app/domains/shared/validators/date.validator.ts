import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class DateValidators {
  static greaterThan(startKey: string, endKey: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate: Date = control.get(startKey)?.value;
      const endDate: Date = control.get(endKey)?.value;
      if (!startDate || !endDate) {
        return null;
      }
      if (startDate >= endDate) {
        return { greaterThan: true };
      }
      return null;
    };
  }
}
