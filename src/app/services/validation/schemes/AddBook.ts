import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  isbn: yup
    .string()
    .min(10, 'ISBN should be at least of 10 digits')
    .max(13, 'ISBN should be at most of 13 digits')
    .matches(/^\d+$/, 'ISBN should contain digits only')
    .required('ISBN is required'),
  title: yup.string().required('Title is required'),
  originTitle: yup.string().required('Origin title is required'),
  subtitle: yup.string().required('Substitle is required'),
  author: yup.string().required('Author is required'),
  publisher: yup.string().required('Publisher is required'),
  publishedDate: yup
    .string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])[- /.]/,
      'Date format should be dd-mm-yyyy',
    )
    .required('Published Date is required'),
});
