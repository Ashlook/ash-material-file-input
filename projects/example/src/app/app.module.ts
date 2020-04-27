import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AshMatFileInputModule } from 'ash-material-file-input';
import { SharedMaterialModule } from './shared-material.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FileInputComponent } from './file-input/file-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    FileInputComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AshMatFileInputModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
