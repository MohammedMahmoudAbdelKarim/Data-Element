export interface FieldModel {
  id?: number,
  modelId?: number,
  name?: string,
  type?: string,
  required?: boolean,
  numberRange?: string,
  stringLength?: number,
  builtInFormat?: string,
  numberMax?: number,
  numberMin?: number
}
