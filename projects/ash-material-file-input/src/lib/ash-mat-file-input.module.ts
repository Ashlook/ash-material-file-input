import { NgModule } from '@angular/core';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { DropDirective } from './directive/drop.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NoMultipleDirective } from './directive/no-multiple.directive';



@NgModule({
  declarations: [FileInputComponent, ByteFormatPipe, DropDirective, NoMultipleDirective],
  imports: [BrowserModule],
  exports: [FileInputComponent, ByteFormatPipe, DropDirective, NoMultipleDirective],
})
export class AshFileInputModule { }
