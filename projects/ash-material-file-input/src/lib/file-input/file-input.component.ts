import { Component, OnInit, ElementRef, Input, Optional, Self, OnDestroy, HostBinding, HostListener, DoCheck } from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm, FormGroupDirective } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ErrorStateMatcher, CanUpdateErrorStateCtor, mixinErrorState } from '@angular/material/core';

// Boilerplate for applying mixins to MatInput.
/** @docs-private */
class FileInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl) { }
}
const _FileInputMixinBase: CanUpdateErrorStateCtor & typeof FileInputBase =
  mixinErrorState(FileInputBase);


@Component({
  selector: 'ash-mat-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FileInputComponent }],
})
export class FileInputComponent extends _FileInputMixinBase implements ControlValueAccessor, MatFormFieldControl<FileList>, OnInit, OnDestroy, DoCheck {
  static nextId = 0;

  @Input() errorStateMatcher: ErrorStateMatcher

  @Input()
  get value(): FileList | null {
    if (this._value && this._value.length > 0) {
      return this._value;
    }
    return null;
  }
  set value(files: FileList | null) {
    if (files && files.length > 0) {
      this._value = files;
      this.stateChanges.next();
    }
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(placehoder) {
    this._placeholder = placehoder ;
    this.stateChanges.next();
  }

  @Input() accept: string | null = null;
  @Input() multiple: boolean = false;
  @Input() droppable: boolean = false;
  @Input() dropContainerHeight: number = 60;

  get empty(): boolean {
    return !this.value || !(this.value.length > 0);
  }

  @HostBinding('class.file-input-floating')
  get shouldLabelFloat() {
    return this.droppable || (this.focused || !this.empty);
  }

  @HostBinding('class.file-input-disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() _parentForm: NgForm,
    _defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(files: FileList): void {
    this.value = files;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private _value: FileList;
  stateChanges = new Subject<void>();
  @HostBinding() id = `ash-file-input-${FileInputComponent.nextId++}`;
  private _placeholder: string;
  focused: boolean = false;
  private _required: boolean;
  private _disabled: boolean;
  controlType: string = 'ash-file-input';
  autofilled?: boolean;

  @HostBinding('attr.aria-describedby') describedBy = ''
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
    this.open();
  }

  ngOnInit(): void {
    this.multiple = coerceBooleanProperty(this.multiple);
    this.droppable = coerceBooleanProperty(this.droppable);
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  @HostListener('change', ['$event'])
  onChange(event: Event) {
    const files: FileList | null = (<HTMLInputElement>event.target).files;
    this._fileChange(files);
  }

  _fileChange(files: FileList) {
    this.value = files;
    this._onChange(this.value);
    this._onTouched();
  }

  get filenames(): string {
    if (!this.empty) {
      const filenamesArray = [];
      for (let i = 0; i < this.value.length; i++) {
        filenamesArray.push(this.value.item(i).name);
      }
      return filenamesArray.join(', ');
    }
    return '';
  }

  public open() {
    if (!this.disabled) {
      this._elementRef.nativeElement.querySelector('input').click();
    }
  }

  public clear(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.value = null;
    this._elementRef.nativeElement.querySelector('input').value = null;
    this._onChange(this.value);
    //this.ngControl?.reset();
  }

}
