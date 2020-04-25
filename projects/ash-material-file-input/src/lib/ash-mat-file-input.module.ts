import { NgModule } from '@angular/core';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { DropDirective } from './directive/drop.directive';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [FileInputComponent, ByteFormatPipe, DropDirective],
  imports: [BrowserModule],
  exports: [FileInputComponent, ByteFormatPipe, DropDirective],
})
export class AshMatFileInputModule { }
