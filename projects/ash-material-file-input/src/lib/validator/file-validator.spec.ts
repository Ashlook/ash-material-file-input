import { FileValidators } from './file-validator';
import { FormControl } from '@angular/forms';
import { FileListMock } from '../../test';

describe('FileValidators', () => {
  const fileTxt = new File(['123456'], 'text.txt', { type: 'text/plain' });
  const filePng = new File(['1234'], 'img.png', { type: 'image/png' });
  const fileJpg = new File([''], 'img.jpg', { type: 'image/jpg' });

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

  describe('maxFileSize', () => {

    it('should validate with no file', () => {
      const control = new FormControl(undefined, [FileValidators.maxFileSize(2)]);
      expect(control.value).toBe(null);
      expect(control.valid).toBeTruthy();
    });

    it('should validate', () => {
      const data = new FileListMock([fileJpg, filePng, fileTxt]);
      const control = new FormControl(data, FileValidators.maxFileSize(10));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with size lesser or equal', () => {
      const data = new FileListMock([fileJpg, filePng, fileTxt]);
      expect(fileTxt.size).toBe(6);
      const control = new FormControl(data, FileValidators.maxFileSize(6));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should not validate with "maxSize" error', () => {
      const data = new FileListMock([fileJpg, filePng, fileTxt]);
      const control = new FormControl(data, [FileValidators.maxFileSize(3)]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeFalsy();
      const sizeError = control.errors.maxSize;
      expect(sizeError).toEqual({
        max: 3,
        size: 4,
        filename: 'img.png',
      });
    });

  });

  describe('acceptedTypes', () => {

    it('should validate with no file', () => {
      const control = new FormControl(undefined, [FileValidators.acceptedTypes('image/png')]);
      expect(control.value).toBe(null);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with [type]/[subtype]', () => {
      const data = new FileListMock([fileTxt, fileTxt, fileTxt]);
      const control = new FormControl(data, FileValidators.acceptedTypes('text/plain'));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with [type]/*', () => {
      const data = new FileListMock([filePng, fileJpg, filePng]);
      const control = new FormControl(data, FileValidators.acceptedTypes('image/*'));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with a list of mixed MIME TYPE', () => {
      const data = new FileListMock([fileJpg, filePng, fileTxt]);
      const control = new FormControl(data, FileValidators.acceptedTypes('text/plain,image/*'));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should not validate with "type" error', () => {
      const data = new FileListMock([fileJpg, filePng, fileTxt]);
      const control = new FormControl(data, FileValidators.acceptedTypes('image/*   ,   text/pdf'));
      expect(control.value).toBe(data);
      expect(control.valid).toBeFalsy();
      const typeError = control.errors.type;
      expect(typeError).toEqual({
        accepted: 'image/*,text/pdf',
        current: 'text/plain',
        filename: 'text.txt',
      });
    });

  });

  describe('maxFileSizeTotal', () => {

    it('should validate with no file', () => {
      const control = new FormControl(undefined, [FileValidators.maxFileSizeTotal(10)]);
      expect(control.value).toBe(null);
      expect(control.valid).toBeTruthy();
    });

    it('should validate', () => {
      const data = new FileListMock([fileJpg, fileTxt]);
      const control = new FormControl(data, [FileValidators.maxFileSizeTotal(10)]);
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with size equal', () => {
      const data = new FileListMock([fileTxt, filePng]);
      const control = new FormControl(data, FileValidators.maxFileSizeTotal(10));
      expect(control.value).toBe(data);
      const size = fileTxt.size + filePng.size;
      expect(size).toBe(10);
      expect(control.valid).toBeTruthy();
    });

    it('should not validate with "maxSizeTotal" error', () => {
      const data = new FileListMock([fileTxt, filePng]);
      const control = new FormControl(data, FileValidators.maxFileSizeTotal(8));
      expect(control.value).toBe(data);
      expect(control.invalid).toBeTruthy();
      const sizeError = control.errors.maxSizeTotal;
      expect(sizeError).toEqual({
        max: 8,
        size: 10,
      });
    });

  });

  describe('maxFile', () => {

    it('should validate with no file', () => {
      const control = new FormControl(undefined, [FileValidators.maxFile(10)]);
      expect(control.value).toBe(null);
      expect(control.valid).toBeTruthy();
    });

    it('should validate', () => {
      const data = new FileListMock([fileJpg, fileTxt]);
      const control = new FormControl(data, FileValidators.maxFile(3));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should validate with file number equal', () => {
      const data = new FileListMock([fileJpg, fileTxt, filePng]);
      const control = new FormControl(data, FileValidators.maxFile(3));
      expect(control.value).toBe(data);
      expect(control.valid).toBeTruthy();
    });

    it('should not validate', () => {
      const data = new FileListMock([fileJpg, fileTxt, filePng, fileTxt]);
      const control = new FormControl(data, FileValidators.maxFile(3));
      expect(control.value).toBe(data);
      expect(control.invalid).toBeTruthy();
      const maxSizeError = control.errors.maxFile;
      expect(maxSizeError).toEqual({
        maxFiles: 3,
        currentFiles: 4,
      });
    });

  });
});
