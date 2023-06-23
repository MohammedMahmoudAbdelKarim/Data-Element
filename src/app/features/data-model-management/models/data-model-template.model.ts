import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface DataModelFormModel extends FormGroup {
  name?: FormControl<string | null>;
  fields?: FormArray;
  path?: FormControl<string | null>;
  transformer?: FormControl<string | null>;
  collection?: FormControl<string | null>;
}
