import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-password-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: PasswordInputComponent },
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class PasswordInputComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy
{
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _formBuilder = inject(FormBuilder);

  static nextId = 0;

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'password-input';
  id = `password-input-${PasswordInputComponent.nextId++}`;

  onChange = (_: any) => {};
  onTouched = () => {};

  @ViewChild('password') passwordInput: HTMLInputElement | undefined;
  group = this._formBuilder.group({
    password: ['', [Validators.required]],
  });

  type = signal<'password' | 'text'>('password');

  get empty() {
    return !this.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get errorState(): boolean {
    return (
      ((this.group.invalid || this.ngControl?.control?.invalid) ?? false) &&
      this.touched
    );
  }

  @Input() set visible(value: boolean) {
    this.type.set(value ? 'text' : 'password');
  }

  @Input('aria-describedby') userAriaDescribedBy: string | undefined;

  @Input()
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  private _required: boolean = false;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string = '';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.group.disable() : this.group.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  set value(password: string | null) {
    const value = password || '';
    this.group.setValue({ password: value });
    this.stateChanges.next();
  }
  get value(): string | null {
    if (this.group.valid) {
      const password = this.group.value.password!;
      return password;
    }
    return null;
  }

  constructor(
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void {
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

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.password-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.passwordInput)
      this._focusMonitor.focusVia(this.passwordInput, 'program');
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(password: string): void {
    this.value = password;
  }

  _handleInput(control: AbstractControl) {
    this.onChange(control.value);
  }
}
