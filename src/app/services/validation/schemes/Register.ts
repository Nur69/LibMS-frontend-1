import * as yup from 'yup';

export const RegisterValidationScheme = yup.object().shape({
  firstName: yup.string().required('First name is required').default(''),
  lastName: yup.string().required('Last name is required'),
  emailName: yup.string().required('Email name is required'),
  emailDomain: yup.string().required('Email domain is required'),
  universityID: yup
    .string()
    .matches(/^\d+$/, 'University ID should contain digits only')
    .min(7, 'University ID must be exactly 7 digits')
    .max(7, 'University ID must be exactly 7 digits')
    .required('University ID is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
