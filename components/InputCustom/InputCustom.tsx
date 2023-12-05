import React, { ChangeEvent, FocusEvent } from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

interface CustomTextFieldProps {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  control: Control<any>;
  placeholder?: string;
  defaultValue?: string;
  error?: boolean;
  messageError?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
}

const InputCustom = ({
  name,
  label,
  type,
  required,
  control,
  placeholder,
  defaultValue,
  error,
  messageError,
  onChange,
  onFocus,
}: CustomTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          variant="outlined"
          fullWidth
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={messageError}
          sx={{ mb: 2 }}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e as ChangeEvent<HTMLInputElement>);
          }}
          onFocus={(e) => {
            onFocus?.(e as FocusEvent<HTMLInputElement>);
          }}
        />
      )}
    />
  );
};

export default InputCustom;
