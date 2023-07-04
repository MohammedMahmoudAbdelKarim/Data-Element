import { environment } from 'src/environments/environment';
const BASE_URL = environment.baseURL;
export const COLLECTION = {
  domains: 'model-groups',
  model: 'models',
  clients: 'clients',
  auth: 'auth',
  fields: 'fields',
  permissions: 'permissions',
  jobs: 'jobs',
} as const;
export const API_URL = (key: keyof typeof COLLECTION) =>
  `${BASE_URL}/${COLLECTION[key]}`;
