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
  const fileTxt = new File([''], 'text.txt', {type: 'text/plain'});
  const fileImg = new File([''], 'text.png', {type: 'image/png'});

  describe('fileExtension', () => {

    it('should validate', () => {
      const data = new FileListMock([fileTxt, fileTxt, fileTxt]);
      const control = new FormControl(data, [FileValidators.acceptedExtensions('.txt')]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });
  });
});
