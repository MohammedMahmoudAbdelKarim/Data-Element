import { FormControl, FormGroup } from '@angular/forms';

export interface PermissionFormModel extends FormGroup {
  domain?: FormControl<string | null>;
  modelId?: FormControl<string | null>;
  ratePerDay?: FormControl<string | null>;
  ratePerHour?: FormControl<string | null>;
  accessLevel?: FormControl<string | null>;
  fieldsId?: FormControl<[] | null>;
}
