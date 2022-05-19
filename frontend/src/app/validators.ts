import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function maxAddition(value: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const suma = control.value.reduce(
      (acc: number, curr: any) => acc + curr?.percentage,
      0
    );
    return suma <= value ? null : { maxAddition: true };
  };
}

export function matchEqual(value: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === value.value ? null : { matchEqual: true };
  };
}

export function minLengthArray(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.length >= min)
      return control.value.length >= min ? null : { minLengthArray: true };

    return { minLengthArray: true };
  };
}
export function additionValidator(value: number = 100): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const suma = control.value.reduce(
        (acc: number, curr: any) => acc + curr?.percentage,
        0
      );
      return suma === value ? null : { additionValidator: suma };
    };
  }