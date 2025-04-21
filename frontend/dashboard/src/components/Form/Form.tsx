import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { FormField } from './FormField';
import { useFormValidation, ValidationRules, FormValues } from '../../hooks/useFormValidation';

export interface FormProps {
  initialValues: FormValues;
  validationRules: { [key: string]: ValidationRules };
  onSubmit: (values: FormValues) => void;
  fields: {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
  }[];
  submitButtonText?: string;
}

export const Form: React.FC<FormProps> = ({
  initialValues,
  validationRules,
  onSubmit,
  fields,
  submitButtonText = 'Gửi',
}) => {
  const { values, errors, touched, handleChange, handleBlur, isValid, resetForm } = useFormValidation(
    initialValues,
    validationRules
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      onSubmit(values);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name]}
            error={touched[field.name] ? errors[field.name] : undefined}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
          />
        ))}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={resetForm}>
            Đặt lại
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid()}>
            {submitButtonText}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Form; 