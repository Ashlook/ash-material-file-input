import { Directive, Output, EventEmitter, HostListener, Renderer2, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[ashDrop]'
})
export class DropDirective {

  @Input() dragoverClass: string;

  @Output() fileDropped = new EventEmitter<FileList>();

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    this._stop(evt);
  }

  @HostListener('dragenter', ['$event']) onDragEnter(evt: DragEvent) {
    this._stop(evt);
    this._addragoverClass();
  }

  @HostListener('dragexit', ['$event']) onDragLeave(evt: DragEvent) {
    this._stop(evt);
    this._removedragoverClass();
  }

  @HostListener('drop', ['$event']) onDrop(evt: DragEvent) {
    this._stop(evt);
    this._removedragoverClass();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  constructor(
    private _renderer: Renderer2,
    private _hostRef: ElementRef,
  ) { }

  private _stop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  private _addragoverClass() {
    if (this.dragoverClass) {
      this._renderer.addClass(this._hostRef.nativeElement, this.dragoverClass);
    }
  }

  private _removedragoverClass() {
    if (this.dragoverClass) {
      this._renderer.removeClass(this._hostRef.nativeElement, this.dragoverClass);
    }
  }

}
