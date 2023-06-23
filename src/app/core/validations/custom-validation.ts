import { REGEX } from './../constants/regex.constant';
import { AbstractControl } from '@angular/forms';
export class CustomValidations {
  public static disallowedWhiteSpace(
    control: AbstractControl
  ): { whiteSpace: boolean } | null {
    const isValid = RegExp(REGEX['disallowedWhiteSpacePattern']).test(
      control?.value
    );
    return isValid ? null : { whiteSpace: true };
  }
  public static disallowedSpecialCharacters(
    control: AbstractControl
  ): { specialCharacters: boolean } | null {
    const isValid = RegExp(REGEX['disallowedSpecialCharactersPattern']).test(
      control?.value
    );
    return !isValid ? null : { specialCharacters: true };
  }
  public static pathPattern(
    control: AbstractControl
  ): { pathPattern: boolean } | null {
    const isValid = RegExp(REGEX['pathPattern']).test(control?.value);
    return isValid ? null : { pathPattern: true };
  }
}
