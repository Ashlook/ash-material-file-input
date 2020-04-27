import { DropDirective } from './drop.directive';
import { Component, ViewChild, Input, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

/* describe('DropDirective', () => {
  it('should create an instance', () => {
    const directive = new DropDirective();
    expect(directive).toBeTruthy();
  });
}); */

@Component({
  selector: 'ash-test-drop',
  template: `<div ashDrop dragoverClass="test-class"></div>`,
})
class TestHostComponent {
  @ViewChild(DropDirective) directive!: DropDirective;
}

fdescribe('DropDirective', () => {
  let host: TestHostComponent;
  let hostElement: DebugElement;
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: DropDirective;

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
    directive = host.directive;
  }));

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
