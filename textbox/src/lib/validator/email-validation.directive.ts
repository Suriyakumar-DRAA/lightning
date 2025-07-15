import { Directive, forwardRef, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appEmailValidation]',
    standalone: true,
    providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidationDirective), multi: true }]
})
export class EmailValidationDirective implements Validator {
    @Input('appEmailValidation') isEmail: boolean = false;

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value && this.isEmail) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value)) return { email: true };
        }
        return null;
    }
}