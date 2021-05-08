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
                //alert("Error: Password must contain at least eight characters!");
            }
            if (password == controlUsername.value) {
                controlPassword.setErrors({ sameAsUsername: true });
                return;
                //alert("Error: Password must be different from Username!");
            }
            regex = /[0-9]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noNumber: true });
                return;
                //alert("Error: password must contain at least one number (0-9)!");
            }
            regex = /[a-z]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noLowercase: true });
                return;
                //alert("Error: password must contain at least one lowercase letter (a-z)!");
            }
            regex = /[A-Z]/;
            if (!regex.test(password)) {
                controlPassword.setErrors({ noUppercase: true });
                return;
                //alert("Error: password must contain at least one uppercase letter (A-Z)!");
            }
            controlPassword.setErrors(null);
            
        }

    }
}