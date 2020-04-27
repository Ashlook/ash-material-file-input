import { ValidatorFn, FormControl } from '@angular/forms';

// tslint:disable-next-line: no-namespace
export namespace FileValidators {

  /**
   * Function to control the max size for each individual file
   * @param maxSize The max size in bytes of each file
   */
  export function maxFileSize(maxSize: number): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file.size > maxSize) {
          return {
            maxSize: {
              max: maxSize,
              size: file.size,
              filename: file.name,
            }
          };
        }
      }
      return null;
    };
  }

  /**
   * Function to control the extention of each file
   * @param accepted Accepted extensions
   */
  export function fileExtension(accepted: string | string[]): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      const exts = Array.isArray(accepted) ? accepted : [accepted];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const fileExt = '.' + file.name.split('.').pop();
        if (!exts.includes(fileExt)) {
          return {
            extension: {
              accepted,
              current: fileExt,
              filename: file.name,
            }
          };
        }
      }
      return null;
    };
  }

  /**
   * Function to control the MIME type of each file
   * @param accepted Accepted MIME Types
   */
  export function fileType(accepted: string | string[]): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      const types = Array.isArray(accepted) ? accepted : [accepted];
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const isInType = types.some(type => (new RegExp(type)).test(file.type));
        if (!isInType) {
          return {
            type: {
              accepted,
              current: file.type,
              filename: file.name,
            }
          };
        }
      }
      return null;
    };
  }
}
