import { ClientModel } from '../../client-management/models/client.model';
import { DataModelFormDataModel } from '../../data-model-management/models/data-model.model';
import { FieldModel } from '../../data-model-management/models/fields.model';

export interface PermissionModel {
  id?: number;
  modelId?: number;
  clientId?: number;
  ratePerDay?: number;
  ratePerHour?: number;
  fieldsId?: number[];
  accessLevel?: string;
  modelName?: string;
  clientName?: string;
  client?: ClientModel;
  model?: DataModelFormDataModel;
  allowedFields?: FieldModel[];
}
