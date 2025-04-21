import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type BaseTextFieldProps = Omit<TextFieldProps, 'name' | 'error' | 'helperText'>;

export interface FormFieldProps extends BaseTextFieldProps {
  name: string;
  value: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  value,
  errorMessage,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  required,
  ...props
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      value={value}
      type={type}
      placeholder={placeholder}
      required={required}
      error={!!errorMessage}
      helperText={errorMessage}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      {...props}
    />
  );
};

export default FormField; 