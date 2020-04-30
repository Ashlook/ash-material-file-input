import { FileValidators } from './file-validator';
import { FormControl } from '@angular/forms';

class FileListMock implements FileList {
  readonly length: number;
  [index: number]: File;

  constructor(files: File[]) {
    files.forEach((file, i) => this[i] = file);
    this.length = files.length;
  }

  item(index: number) {
    return this[index];
  }
}

describe('FileValidators', () => {
  const fileTxt = new File(['123456'], 'text.txt', {type: 'text/plain'});
  const filePng = new File([''], 'img.png', {type: 'image/png'});
  const fileJpg = new File([''], 'img.jpg', {type: 'image/jpg'});

  describe('acceptedExtensions', () => {

    it('should validate with no file', () => {
       const control = new FormControl(undefined, [FileValidators.acceptedExtensions('.txt')]);
       expect(control.value).toBe(null);
       expect(control.valid).toBeTruthy();
    });

    it('should validate', () => {
      const data = new FileListMock([fileTxt, fileTxt, fileTxt]);
      const control = new FormControl(data, [FileValidators.acceptedExtensions('.txt')]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with a list of accepted extensions', () => {
      const data = new FileListMock([filePng, filePng, fileTxt]);
      const control = new FormControl(data, [FileValidators.acceptedExtensions('.txt,.png')]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should not validate with "extension" error', () => {
      const data = new FileListMock([fileJpg]);
      const control = new FormControl(data, [FileValidators.acceptedExtensions('.png,      .txt')]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeFalsy();
      const extError = control.errors.extension;
      expect(extError).toEqual({
        accepted: '.png,.txt',
        current: '.jpg',
        filename: 'img.jpg',
      });
    });
  });
});
