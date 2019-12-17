import { AbstractControl } from "@angular/forms";

export const passwordValidator = (control: AbstractControl) => {
  if (control && (control.value !== null || control.value !== undefined)) {
    const passwordConfirmationValue = control.value;
    const passwordControl = control.root.get("password");
    if (passwordControl) {
      const passwordValue = passwordControl.value;
      if (passwordValue !== passwordConfirmationValue || passwordValue === '') {
        return {
          isError: true
        };
      }
    }
  }
  return null;
};
