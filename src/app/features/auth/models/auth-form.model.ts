import { FormControl, FormGroup } from '@angular/forms';

export interface LoginFormModel extends FormGroup {
  email?: FormControl<string | null>;
  password?: FormControl<string | null>;
}
