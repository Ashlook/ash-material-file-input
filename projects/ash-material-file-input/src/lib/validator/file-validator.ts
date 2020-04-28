import { ValidatorFn, FormControl } from '@angular/forms';


export class FileValidators {

  /**
   * Function to control the max size for each individual file
   * @param maxSize The max size in bytes of each file
   */
  static FileSizeMax(maxSize: number): ValidatorFn {
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
  static FileExtOk(accepted: string | string[]): ValidatorFn {
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
  static FileTypeOk(accepted: string | string[]): ValidatorFn {
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
