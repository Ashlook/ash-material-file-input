import { NgModule } from '@angular/core';
import { FileInputComponent } from './file-input/file-input.component';
import { ByteFormatPipe } from './pipe/byte-format.pipe';
import { DropDirective } from './directive/drop.directive';
import { BrowserModule } from '@angular/platform-browser';
import { DropLabelDirective } from './file-input/drop-label';



@NgModule({
  declarations: [FileInputComponent, ByteFormatPipe, DropDirective, DropLabelDirective],
  imports: [BrowserModule],
  exports: [FileInputComponent, ByteFormatPipe, DropDirective, DropLabelDirective],
})
export class AshMatFileInputModule { }
