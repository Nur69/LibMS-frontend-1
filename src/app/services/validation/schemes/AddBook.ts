import * as yup from 'yup';
const FILE_SIZE = 1048576; // 1MB
export const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const ValidationSchema = yup.object().shape({
  isbn: yup
    .string()
    .required('ISBN is required')
    .test('isbnLen', 'Invalid ISBN', isbn => {
      if (isbn) {
        return isbn.length === 10 || isbn.length === 13;
      }
      return false;
    }),
  title: yup.string().required('Title is required'),
  originalTitle: yup.string(),
  subtitle: yup.string(),
  pageCount: yup
    .number()
    .required('Number of pages required')
    .min(1, 'Number of pages must be greater than or equal to 1')
    .typeError('Page count must be a number'),
  publisher: yup.string().required('Publisher is required'),
  publicationDate: yup
    .date()
    .required('Publication Date is required')
    .typeError('Date format should be dd/mm/yyyy'),
  authors: yup
    .array()
    .of(
      yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
      }),
    )
    .test({
      message: 'At least one author is required',
      test: arr => (arr?.length ? true : false),
    }),
  image: yup
    .mixed()
    .required('A file is required')
    .test(
      'fileSize',
      'File too large (Max size: 1MB)',
      (fileList: FileList) => {
        const file: File = fileList[0];
        return file && file.size < FILE_SIZE;
      },
    )
    .test('fileFormat', 'Unsupported format', (fileList: FileList) => {
      const file: File = fileList[0];
      return file && SUPPORTED_IMAGE_FORMATS.includes(file.type);
    }),
});
