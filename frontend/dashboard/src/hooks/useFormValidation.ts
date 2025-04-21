import { useState, useCallback } from 'react';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface FormValues {
  [key: string]: string;
}

export const useFormValidation = (
  initialValues: FormValues,
  validationRules: { [key: string]: ValidationRules }
) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      const rules = validationRules[name];
      if (!rules) return undefined;

      if (rules.required && !value) {
        return 'Trường này là bắt buộc';
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `Tối thiểu ${rules.minLength} ký tự`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Tối đa ${rules.maxLength} ký tự`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return 'Giá trị không hợp lệ';
      }

      if (rules.custom) {
        return rules.custom(value);
      }

      return undefined;
    },
    [validationRules]
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    },
    [validateField]
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error || '' }));
    },
    [validateField, values]
  );

  const isValid = useCallback(() => {
    return Object.keys(validationRules).every((name) => !validateField(name, values[name]));
  }, [validationRules, values, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    resetForm,
  };
};

export default useFormValidation; 