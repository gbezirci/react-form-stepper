import * as Yup from 'yup';

export const stepperValidation = Yup.object().shape({
  name: Yup.string().when('step', {
    is: 1,
    then: (schema) => schema.required('Name is required'),
  }),
  surname: Yup.string().when('step', {
    is: 1,
    then: (schema) => schema.required('Surname is required'),
  }),
  age: Yup.string().when('step', {
    is: 2,
    then: (schema) => schema.required('Age is required'),
  }),
  job: Yup.string().when('step', {
    is: 2,
    then: (schema) => schema.required('Job is required'),
  }),
  about: Yup.string().when('step', {
    is: 3,
    then: (schema) => schema.required('About is required'),
  }),
});
