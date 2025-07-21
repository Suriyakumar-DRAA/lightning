import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, Directive, Input, HostListener, Self, Optional, ViewChild, forwardRef } from '@angular/core';
import { FormsModule, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ControlValueAccessor, NgControl, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[appCommonValidation]',
    standalone: true,
    providers: [{ provide: NG_VALIDATORS, useExisting: CommonValidationDirective, multi: true }]
})
export class CommonValidationDirective implements Validator {
    @Input() required = false;
    @Input() minLength: number | null = null;
    @Input() maxLength: number | null = null;
    @Input() allowedChars: 'alphanumeric-hyphen' | 'numeric' | 'alphanumeric' | 'alpha' | null = null;

    validate(control: AbstractControl): ValidationErrors | null {
        console.log('🔍 CommonValidationDirective.validate called', {
            value: control.value,
            required: this.required,
            minLength: this.minLength,
            maxLength: this.maxLength,
            allowedChars: this.allowedChars
        });
        
        const errors: ValidationErrors = {};
        const value = control.value;
        if (typeof value === 'string' && value.trim().length > 0 && value.startsWith(' ')) {
            errors['whitespace'] = true;
        }
        if (this.required && (value === null || value === undefined || String(value).trim() === '')) errors['required'] = true;

        if (this.minLength && value && String(value).length < this.minLength) {
            errors['minlength'] = { requiredLength: this.minLength, actualLength: String(value).length }
        }

        if (this.maxLength && value && String(value).length > this.maxLength) {
            errors['maxlength'] = { requiredLength: this.maxLength, actualLength: String(value).length }
        }

        const patterns: Record<string, RegExp> = {
            'alpha': /^[a-zA-Z]*$/,
            'numeric': /^[0-9]*$/,
            'decimal': /^\d*(\.\d{0,2})?$/,
            'alphanumeric': /^[a-zA-Z0-9]*$/,
            'alphanumeric-hyphen': /^[a-zA-Z0-9-]*$/,
        };

        if (this.allowedChars && patterns[this.allowedChars] && !patterns[this.allowedChars].test(value)) {
             errors['notAllowedCharacter'] = true
        }

        return Object.keys(errors).length > 0 ? errors : null;
    }

    // @HostListener('keydown', ['$event'])
    // onKeydown(event: KeyboardEvent) {
    //     const allowedKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete'];
    //     const inputElement = event.target as HTMLInputElement;
    //     const currentValue = inputElement.value;
    //     if (allowedKeys.includes(event.key) || (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key))) return;
    //     if (this.maxLength && currentValue.length >= this.maxLength && inputElement.selectionStart === inputElement.selectionEnd) {
    //         event.preventDefault();
    //         return;
    //     }
    //     if (this.allowedChars === 'alphanumeric-hyphen') {
    //         const alphanumericHyphenRegex = /^[a-zA-Z0-9-]$/;
    //         if (!alphanumericHyphenRegex.test(event.key)) event.preventDefault();
    //         return;
    //     }
    //     if (this.digit !== null) {
    //         if (event.key === '.' && !currentValue.includes('.')) return;
    //         if (currentValue.includes('.') && (inputElement.selectionStart ?? -1) > currentValue.indexOf('.')) {
    //             const decimalPart = currentValue.split('.')[1];
    //             if (decimalPart && decimalPart.length >= this.digit) event.preventDefault();
    //         }
    //         if (isNaN(Number(event.key)) && event.key !== '.') event.preventDefault();
    //     }
    // }
}
