import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Directive, Input, HostListener, Self, Optional, ViewChild, forwardRef } from '@angular/core';
import { FormsModule, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ControlValueAccessor, NgControl, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appDecimalValidation]',
    standalone: true, // Directives are standalone
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => DecimalValidationDirective), multi: true }]
})
export class DecimalValidationDirective implements Validator {
    @Input({ alias: 'appDecimalValidation', transform: (value: string | number | null | undefined) => (value === null || value === undefined) ? null : parseInt(String(value), 10) })
    digit: number | null = null;

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (this.digit === null || value === null || value === '') return null;
        const stringValue = String(value);
        if (!/^-?\d*\.?\d*$/.test(stringValue)) return { number: true };
        if (stringValue.includes('.')) {
            const decimalPart = stringValue.split('.')[1];
            if (decimalPart && decimalPart.length > this.digit) {
                return { maxdigits: { required: this.digit, actual: decimalPart.length } };
            }
        }
        return null;
    }
}