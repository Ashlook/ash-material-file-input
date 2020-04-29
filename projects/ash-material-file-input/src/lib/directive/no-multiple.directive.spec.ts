import { NoMultipleDirective } from './no-multiple.directive';

describe('MultipleDirective', () => {
  it('should create an instance', () => {
    const directive = new NoMultipleDirective();
    expect(directive).toBeTruthy();
  });
});
