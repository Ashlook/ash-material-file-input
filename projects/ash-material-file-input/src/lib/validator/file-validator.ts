import { ValidatorFn, FormControl } from '@angular/forms';


export class FileValidators {

  /**
   * Function to control the total number of files max
   * @param maxFile max number of files
   */
  static maxFile(maxFiles: number): ValidatorFn {
    const fn = (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      if (files.length > maxFiles) {
        return {
          maxFile: {
            maxFiles,
            currentFiles: files.length,
          }
        };
      }
      return null;
    };
    return fn;
  }

  /**
   * Function to control the total max size of the files
   * @param maxSize The total max size
   */
  static maxFileSizeTotal(maxSize: number): ValidatorFn {
    const fn = (control: FormControl): { [key: string]: any } | null => {
      const files: FileList = control.value;
      if (!files || files.length <= 0) {
        return null;
      }
      const totalSize = Array.from(files).reduce((sum, file) => sum + file.size, 0);
      if (totalSize > maxSize) {
        return {
          maxSizeTotal: {
            max: maxSize,
            size: totalSize,
          }
        };
      }
      return null;
    };
    return fn;
  }

  /**
   * Function to control the max size for each individual file
   * @param maxSize The max size in bytes of each file
   */
  static maxFileSize(maxSize: number): ValidatorFn {
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
  static acceptedExtensions(accepted: string): ValidatorFn {
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
              accepted: exts.join(','),
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
  static acceptedTypes(accepted: string): ValidatorFn {
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
              accepted: types.join(','),
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
