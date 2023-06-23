import { FormControl, FormGroup } from '@angular/forms';

export interface DomainFormModel extends FormGroup {
  name?: FormControl<string | null>;
  admins?: FormControl<string[] | null>;
  path?: FormControl<string | null>;
}
