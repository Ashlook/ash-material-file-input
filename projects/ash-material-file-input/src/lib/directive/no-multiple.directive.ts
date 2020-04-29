import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: 'ash-mat-file-input:not([multiple]), ash-mat-file-input[multiple=false]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoMultipleDirective, multi: true }],
})
export class NoMultipleDirective implements Validator {

  constructor() {}

  validate(control: FormControl) {
    if (control.value?.length > 1) {
      return {
        multiple: {
          maxFiles: 1,
          currentFiles: control.value.length,
        }
      };
    }
    return null;
  }

}
