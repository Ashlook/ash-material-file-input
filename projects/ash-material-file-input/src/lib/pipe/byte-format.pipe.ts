import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteFormat'
})
export class ByteFormatPipe implements PipeTransform {

  private _byteTypes = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  transform(value: any, ...args: any[]): string {
    if (isNaN(value) || value < 0) {
      return `${value}`;
    }
    const from = args[0] || 'b';
    const to = args[1] || 'Mb';
    if (from === to) {
      return `${value}${to}`;
    }
    const iFrom = this._byteTypes.indexOf(from);
    const iTo = this._byteTypes.indexOf(to);
    if (iFrom < 0 || iTo < 0) {
      throw new SyntaxError('Wrong params format');
    }
    const exp = this._byteTypes.indexOf(from) - this._byteTypes.indexOf(to);
    if (exp < 0) {
      return parseFloat((value / Math.pow(1024, (exp * -1))).toFixed(2)) + to;
    } else {
      return parseFloat((value * Math.pow(1024, exp)).toFixed(2)) + to;
    }


  }

}
