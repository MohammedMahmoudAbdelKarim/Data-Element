export const ERROR_MESSAGE: {
  readonly [key: string]: string;
} = {
  required: 'Field is required.',
  email: 'Invalid email.',
  minlength: 'Must be more than 3 characters.',
  whiteSpace: "Can't include space.",
  specialCharacters: "Can't include special characters.",
  pathPattern: 'Should be lowercase with dash only.'
} as const;
