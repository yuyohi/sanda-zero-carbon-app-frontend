/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@mui/material/TextField';
import {
  UseFormRegister,
  Path,
  FieldErrorsImpl,
  DeepRequired,
} from 'react-hook-form';

type FormProps<T> = {
  label?: string;
  type?: string;
  formName?: Path<T>;
  register?: UseFormRegister<T>;
  errors?: FieldErrorsImpl<DeepRequired<T>>;
};

const Form = <T,>({
  label = '',
  formName,
  type = 'text',
  register = undefined,
  errors = undefined,
}: FormProps<T>) =>
  register && formName && errors ? (
    <TextField
      label={label}
      type={type}
      {...register(formName)}
      error={formName in errors}
      helperText={errors[formName]?.message as string}
    />
  ) : (
    <TextField label={label} type={type} />
  );

export default Form;
