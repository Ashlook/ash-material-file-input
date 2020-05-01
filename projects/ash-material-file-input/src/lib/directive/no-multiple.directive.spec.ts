import { NoMultipleDirective } from './no-multiple.directive';
import { Component, DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileInputComponent } from '../file-input/file-input.component';
import { FileListMock } from '../../test';

@Component({
  selector: 'host-no-multiple-directive',
  template: `
    <ash-mat-file-input [formControl]="fc"><ash-mat-file-input>
  `
})
class HostNoMultipleComponent {

  fc = new FormControl(null);

}

describe('MultipleDirective', () => {
  let fixture: ComponentFixture<HostNoMultipleComponent>;
  let hostDe: DebugElement;
  let host: HostNoMultipleComponent;
  let directiveDe: DebugElement;
  let fileInputDe: DebugElement;
  const fileTxt = new File(['123456'], 'text.txt', {type: 'text/plain'});


  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HostNoMultipleComponent, FileInputComponent, NoMultipleDirective],
      imports: [ReactiveFormsModule],
    }).createComponent(HostNoMultipleComponent);

    fixture.detectChanges();

    hostDe = fixture.debugElement;
    host = fixture.componentInstance;
    directiveDe = hostDe.query(By.directive(NoMultipleDirective));
    fileInputDe = hostDe.query(By.directive(FileInputComponent));
  }));

  it('should create an instance', () => {
    const directive = directiveDe.injector.get(NoMultipleDirective) as NoMultipleDirective;
    expect(directive).toBeTruthy();
  });

  it('should validate if there is only one file', () => {
    const data = new FileListMock([fileTxt]);
    const fileInput = fileInputDe.componentInstance as FileInputComponent;
    fileInput._fileChange(data);
    expect(host.fc.valid).toBeTruthy();
  });

  it('should not validate if there is more than one file', () => {
    const data = new FileListMock([fileTxt, fileTxt]);
    const fileInput = fileInputDe.componentInstance as FileInputComponent;
    fileInput._fileChange(data);
    expect(host.fc.invalid).toBeTruthy();
  });
});
