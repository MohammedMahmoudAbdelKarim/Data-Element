import { AllowedActions, TableHeaders } from '../models';

export const TABLE_ACTIONS: TableHeaders = {
  title: '',
  colKey: 'actions',
};

export const DELETE_ACTION: AllowedActions = {
  label: 'Delete',
  icon: 'delete',
  action: 'DELETE',
};

export const VIEW_ACTION: AllowedActions = {
  label: 'View Details',
  icon: 'remove_red_eye',
  action: 'VIEW',
};

export const EDIT_ACTION: AllowedActions = {
  label: 'Edit',
  icon: 'edit',
  action: 'EDIT',
};
