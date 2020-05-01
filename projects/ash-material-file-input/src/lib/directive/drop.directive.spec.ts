import { DropDirective } from './drop.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'ash-test-drop',
  template: `
    <div ashDrop dragoverClass="test-class" (fileDropped)="files = $event">Drop with class</div>
    <div ashDrop>Drop without class</div>
    <div>No drop</div>
  `,
})
class TestHostComponent {
  files: FileList;
}

describe('DropDirective', () => {
  let host: TestHostComponent;
  let hostElement: DebugElement;
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveElement: DebugElement[];
  let mainDir: DropDirective;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        DropDirective,
      ],
    }).createComponent(TestHostComponent);

    fixture.detectChanges();

    hostElement = fixture.debugElement;
    host = fixture.componentInstance;
    directiveElement = hostElement.queryAll(By.directive(DropDirective));
    mainDir = directiveElement[0].injector.get(DropDirective) as DropDirective;
  }));

  it('should create component', () => {
    expect(host).toBeTruthy();
  });

  it('should have two ashDrop elements', () => {
    expect(directiveElement.length).toBe(2);
  });

  it('should first <div> dragoverClass input be "test-class"', () => {
    expect(mainDir.dragoverClass).toBe('test-class');
  });

  it('should 2nd <div> dragoverClass input be "ash-dragover" (default)', () => {
    const dir = directiveElement[1].injector.get(DropDirective) as DropDirective;
    expect(dir.dragoverClass).toBe('ash-dragover');
  });

  it('should add dragoverClass on dragenter and remove it on dragexit', () => {
    const div = directiveElement[0].nativeElement as HTMLDivElement;
    expect(div).not.toHaveClass('test-class');
    div.dispatchEvent(new Event('dragenter'));
    fixture.detectChanges();
    expect(div).toHaveClass('test-class', 'toto');

    div.dispatchEvent(new Event('dragexit'));
    fixture.detectChanges();
    expect(div).not.toHaveClass('test-class');
  });

  it('should call onDragOver on dragover event', () => {
    const div = directiveElement[0].nativeElement as HTMLDivElement;
    const spy = spyOn(mainDir, 'onDragOver').and.callThrough();
    div.dispatchEvent(new Event('dragover'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onDrop on drop event', () => {
    const div = directiveElement[0].nativeElement as HTMLDivElement;
    const spy = spyOn(mainDir, 'onDrop');
    div.dispatchEvent(new Event('drop'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit FileList when onDrop is called', () => {
    const file = new File([''], 'test.txt');
    const files = { 0: file, length: 1, item: (index: number) => file } as FileList;
    const spy = spyOn(mainDir.fileDropped, 'emit').and.callThrough();
    const fileDropEvent = {
      preventDefault: () => { },
      stopPropagation: () => { },
      dataTransfer: {
        files
      }
    };
    mainDir.onDrop(fileDropEvent as DragEvent);
    expect(spy).toHaveBeenCalledWith(files);
    expect(host.files).toEqual(files);
  });
});
