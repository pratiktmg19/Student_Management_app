import { AbstractControl, ValidationErrors } from '@angular/forms'; 

// export function PasswordValidator(control:AbstractControl):{ [key:string]:boolean } | null {
//     const password = control.get('password');
//     const confirmPassword = control.get('confirmPassword');
//     return password && confirmPassword && password.value !== confirmPassword.value ? {'misMatch':true}
//     :null;    
// }
export function matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
}