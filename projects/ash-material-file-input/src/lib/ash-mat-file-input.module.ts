import { NgModule } from '@angular/core';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { DropDirective } from './directive/drop.directive';
import { NoMultipleDirective } from './directive/no-multiple.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FileInputComponent, ByteFormatPipe, DropDirective, NoMultipleDirective],
  imports: [CommonModule],
  exports: [FileInputComponent, ByteFormatPipe, DropDirective, NoMultipleDirective],
})
export class AshFileInputModule { }
