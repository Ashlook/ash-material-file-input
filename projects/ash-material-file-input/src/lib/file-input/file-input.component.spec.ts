import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputComponent } from './file-input.component';
import { FileListMock } from '../../test';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'test-host-file-input',
  template: `
  <ash-mat-file-input [formControl]="fc" #fileInput></ash-mat-file-input>
  <mat-form-field>
    <ash-mat-file-input [formControl]="fcDisabled"></ash-mat-file-input>
  </mat-form-field>
  <ash-mat-file-input></ash-mat-file-input>
  <div class="click-div" (click)="fileInput.open()"></div>
  `
})
class HostFileInputComponent {
  fc = new FormControl(null);
  fcDisabled = new FormControl({value: null, disabled: true});
}

describe('FileInputComponent', () => {
  let componentsDe: DebugElement[];
  let component: FileInputComponent;
  let hostDe: DebugElement;
  let fixture: ComponentFixture<HostFileInputComponent>;

  const fileTxt = new File(['123456'], 'text.txt', { type: 'text/plain' });
  const filePng = new File(['1234'], 'img.png', { type: 'image/png' });
  const fileJpg = new File([''], 'img.jpg', { type: 'image/jpg' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostFileInputComponent, FileInputComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostFileInputComponent);
    hostDe = fixture.debugElement;
    componentsDe = hostDe.queryAll(By.directive(FileInputComponent));
    component = componentsDe[0].componentInstance as FileInputComponent;
    fixture.detectChanges();
  });

  it('should create with three FileInputComponent', () => {
    expect(componentsDe.length).toBe(3);
    expect(component).toBeTruthy();
  });

  it('should have no files by default', () => {
    expect(component.value).toBeNull();
  });

  it('should set/get value', () => {
    const data = new FileListMock([fileJpg, filePng, fileTxt]);
    component.value = data;
    expect(component.value.length).toBe(3);
  });

  it('should not have value if FileList is empty', () => {
    const data = new FileListMock([]);
    component.value = data;
    expect(component.value).toBeNull();
  });

  it('should set/get placeholder', () => {
    const placeholder = 'Test placeholder';
    component.placeholder = placeholder;
    expect(component.placeholder).toBe(placeholder);
  });

  it('should show placeholder when there is no files', () => {
    const filenameEl = hostDe.query(By.css('.ash-file-input-filename')).nativeElement as HTMLSpanElement;
    component.placeholder = 'Placeholder';
    fixture.detectChanges();
    expect(filenameEl.textContent).toBe('Placeholder');
    expect(filenameEl).toHaveClass('ash-file-input-placeholder');
    component.value = new FileListMock([fileJpg, filePng]);
    fixture.detectChanges();
    expect(filenameEl.textContent).toBe('img.jpg, img.png');
    expect(filenameEl).not.toHaveClass('ash-file-input-placeholder');
    component.value = new FileListMock([]);
    fixture.detectChanges();
    expect(filenameEl.textContent).toBe('Placeholder');
    expect(filenameEl).toHaveClass('ash-file-input-placeholder');
  });

  it('should set/get required', () => {
    const req = true;
    component.required = req;
    expect(component.required).toBe(req);
  });

  it('should set/get disabled', () => {
    const dis = false;
    component.disabled = dis;
    expect(component.disabled).toBe(dis);
  });

  it('should have "accept" attribute on input element', () => {
    const accept = '.txt';
    component.accept = accept;
    expect(component.accept).toBe(accept);
    fixture.detectChanges();
    const inputEl = componentsDe[0].query(By.css('input[type=file]')).nativeElement as HTMLInputElement;
    expect(inputEl.getAttribute('accept')).toBe(accept);
  });

  it('should open file explorer onContainerClick()', () => {
    const spy = spyOn(component, 'open').and.callThrough();
    component.onContainerClick(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should open file explorer on click on a designated element', () => {
    const spy = spyOn(component, 'open').and.callThrough();
    hostDe.query(By.css('div.click-div')).nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should not open file explorer if disabled', () => {
    const spy = spyOn(componentsDe[1].query(By.css('input[type=file]')).nativeElement, 'click');
    const comp = componentsDe[1].componentInstance as FileInputComponent;
    comp.onContainerClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update files on change event', () => {
    const files = new FileListMock([fileJpg, filePng, fileTxt]);
    const spy = spyOn(component, 'onChange').and.callThrough();
    (componentsDe[0].nativeElement as HTMLElement).dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    component._fileChange(files);
    expect(component.value).toBe(files);
  });

  it('should remove files', () => {
    const files = new FileListMock([fileJpg, filePng, fileTxt]);
    component.value = files;
    expect(component.value).toBe(files);
    component.clear();
    component.clear(new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.value).toBeNull();
    expect(component.empty).toBeTruthy();
  });
});
