import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';

export function maxFilesLength(maxLength?: number): ValidatorFn {
  return ({ value }: AbstractControl) =>
    !maxLength
      ? null
      : value.length > maxLength
      ? {
          maxLength: new TuiValidationError(
            `Error: maximum limit - ${maxLength} files for upload`
          ),
        }
      : null;
}
