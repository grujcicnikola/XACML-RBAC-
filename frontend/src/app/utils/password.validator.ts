import { FormGroup } from '@angular/forms';

export function checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const controlPassword = formGroup.controls[controlName];
        const controlUsername = formGroup.controls[matchingControlName];

        if (controlPassword.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        var regex = /^\w+$/;
        var password = controlPassword.value
        if (password != "") {
            if (password.length < 8) {
                controlPassword.setErrors({ minLength: true });
                return;
            }
            if (password == controlUsername.value) {
                controlPassword.setErrors({ sameAsUsername: true });
                return;
            }
            regex = /[0-9]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noNumber: true });
                return;
            }
            regex = /[a-z]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noLowercase: true });
                return;
            }
            regex = /[A-Z]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noUppercase: true });
                return;
            }
            regex =/\W/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noSymbol: true });
                return;
            } 
            controlPassword.setErrors(null);
            
        }

    }
}