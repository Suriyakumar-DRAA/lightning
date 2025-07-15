// libs/textbox/src/lib/textbox.component.ts
import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms'; // Import FormsModule for ngModel
import { DecimalValidationDirective } from '../validator/decimal-validation.directive';
import { EmailValidationDirective } from '../validator/email-validation.directive';
import { CommonValidationDirective } from '../validator/common-validation.directive';

@Component({
  selector: 'lightning-textbox', // Your component's selector
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalValidationDirective, EmailValidationDirective, CommonValidationDirective],
  templateUrl: './textbox.html',
  styleUrls: ['./textbox.scss'], // Link to SCSS file
})
export class TextboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Enter value';
  @Input() type: 'text' = 'text';
  @Input() required: boolean = false;
  @Input() minLength: number | null = null;
  @Input() maxLength: number | null = null;
  @Input({ transform: (value: string | number) => (value === null || value === undefined) ? null : parseInt(String(value), 10) })
  @Input() digit: number | null = null;
  @Input() allowedChars: 'alphanumeric-hyphen' | 'numeric' | 'alphanumeric' | 'alpha' | null = null;
  @Input() isEmail: boolean = false; // For email validation

  value: string | null = null;
  isDisabled: boolean = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(obj: any): void { this.value = obj; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.isDisabled = isDisabled; }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  onBlur(): void { this.onTouched(); }
}
