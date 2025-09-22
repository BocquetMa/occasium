import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Too short').required('Required'),
});

export const registerSchema = yup.object({
  name: yup.string().min(2).required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'Too short').required('Required'),
});

export const eventSchema = yup.object({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  location: yup.string().required('Required'),
  date: yup.date().required('Required'),
  capacity: yup.number().min(1, 'Must be at least 1').required('Required'),
  categoryIds: yup.array().of(yup.number()).required(),
  tagIds: yup.array().of(yup.number()).required(),
});
