import * as Yup from 'yup';

export const jobValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  company: Yup.string().required('Company is required'),
  type: Yup.string().required('Type is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Description is required'),
});
