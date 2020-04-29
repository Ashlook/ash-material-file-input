import { ValidatorFn, FormControl } from '@angular/forms';


export class FileValidators {

  /**
   * Function to control the max size for each individual file
   * @param maxSize The max size in bytes of each file
   */
  static FileSizeMax(maxSize: number): ValidatorFn {
    const fn = (control: FormControl): { [key: string]: any } | null => {
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

    return fn;
  }

  /**
   * Function to control the extention of each file
   * @param accepted Accepted extensions, separated by a comma
   */
  static FileExtOk(accepted: string): ValidatorFn {
    const fn = (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      const exts = accepted.split(',').map(ext => ext.trim());
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

    return fn;
  }

  /**
   * Function to control the MIME type of each file
   * @param accepted Accepted MIME Types separated by a comma
   */
  static FileTypeOk(accepted: string): ValidatorFn {
    const fn = (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      const types = accepted.split(',').map(t => t.trim());
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

    return fn;
  }
}
