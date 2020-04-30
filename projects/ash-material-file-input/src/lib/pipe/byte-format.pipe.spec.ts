import { ByteFormatPipe } from './byte-format.pipe';
import { async, TestBed } from '@angular/core/testing';

describe('ByteFormatPipe', () => {
  let pipe: ByteFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ByteFormatPipe],
    });

    pipe = TestBed.inject(ByteFormatPipe);
  });

  it('should format from Byte to Megabyte (default)', () => {
    const text = pipe.transform(104857600);
    expect(text).toBe('100Mb');
  });

  it('should only add unit if from = to', () => {
    const text = pipe.transform(100, 'Mb', 'Mb');
    expect(text).toBe('100Mb');
  });

  it('should not tranform value other than number', () => {
    const text = pipe.transform('100Mb');
    expect(text).toBe('100Mb');
  });

  it('should transform form Kilobyte to Megabyte', () => {
    const text = pipe.transform(102400, 'Kb');
    expect(text).toBe('100Mb');
  });

  it('should transform from Megabyte to Byte', () => {
    const text = pipe.transform(100, 'Mb', 'b');
    expect(text).toBe('104857600b');
  });

  it('should tranform floating value', () => {
    const text = pipe.transform(1.5, 'Mb', 'Kb');
    expect(text).toBe('1536Kb');
  });

  it('should throw SyntaxError on wrong parameters', () => {
    expect(() => pipe.transform(102400, 1)).toThrow(new SyntaxError('Wrong params format'));
    expect(() => pipe.transform(102400, 'Kb', 'zqsd')).toThrow(new SyntaxError('Wrong params format'));
    expect(() => pipe.transform(102400, 'gds', 12)).toThrow(new SyntaxError('Wrong params format'));
  });

});
