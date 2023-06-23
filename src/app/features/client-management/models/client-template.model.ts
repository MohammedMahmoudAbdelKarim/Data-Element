import { FormControl, FormGroup } from '@angular/forms';

export interface ClientFormModel extends FormGroup {
  name?: FormControl<string | null>;
  application_owner?: FormControl<string | null>;
  ipWhiteInput?: FormControl<string | null>;
}

export interface ClientFormDataModel {
  name: string;
  ipWhitelist: string[];
  owners: string[];
}
