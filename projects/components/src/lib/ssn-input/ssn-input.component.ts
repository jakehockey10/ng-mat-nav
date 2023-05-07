import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

/** Data structure for holding social security number */
export class SocialSecurityNumber {
  constructor(
    public area: string,
    public group: string,
    public serial: string
  ) {}
}

@Component({
  selector: 'app-ssn-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ssn-input.component.html',
  styleUrls: ['./ssn-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: SsnInputComponent }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class SsnInputComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<SocialSecurityNumber>,
    OnDestroy
{
  private groupRequiredValidator: ValidatorFn = (group) =>
    this.required &&
    this.touched &&
    (!group.value.area || !group.value.group || !group.value.serial)
      ? { required: true }
      : null;

  static nextId = 0;
  @ViewChild('area') areaInput: HTMLInputElement | undefined;
  @ViewChild('group') groupInput: HTMLInputElement | undefined;
  @ViewChild('serial') serialInput: HTMLInputElement | undefined;

  parts: FormGroup<{
    area: FormControl<string | null>;
    group: FormControl<string | null>;
    serial: FormControl<string | null>;
  }>;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'ssn-input';
  id = `ssn-input-${SsnInputComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: { area, group, serial },
    } = this.parts;

    return !area && !group && !serial;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string | undefined;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input() get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): SocialSecurityNumber | null {
    if (this.parts.valid) {
      const {
        value: { area, group, serial },
      } = this.parts;
      return new SocialSecurityNumber(area!, group!, serial!);
    }
    return null;
  }
  set value(ssn: SocialSecurityNumber | null) {
    const { area, group, serial } = ssn || new SocialSecurityNumber('', '', '');
    this.parts.setValue({ area, group, serial });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group(
      {
        area: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(3),
          ],
        ],
        group: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(2),
          ],
        ],
        serial: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
          ],
        ],
      },
      { validators: [this.groupRequiredValidator] }
    );
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.ssn-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.serial.valid && this.serialInput) {
      this._focusMonitor.focusVia(this.serialInput, 'program');
    } else if (this.parts.controls.group.valid && this.serialInput) {
      this._focusMonitor.focusVia(this.serialInput, 'program');
    } else if (this.parts.controls.area.valid && this.groupInput) {
      this._focusMonitor.focusVia(this.groupInput, 'program');
    } else if (this.areaInput) {
      this._focusMonitor.focusVia(this.areaInput, 'program');
    }
  }

  writeValue(ssn: SocialSecurityNumber | null): void {
    this.value = ssn;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}
