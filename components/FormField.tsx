import React from 'react';
import { Input } from "@heroui/input";

// Reusable FormField Component
export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
  onValueChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onValueChange?: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(e.target.value);
    }
  };

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        autoComplete={autoComplete}
        className="w-full"
        disabled={disabled}
        id={name}
        name={name}
        placeholder={placeholder}
        radius="sm"
        required={required}
        type={type}
        onChange={handleChange}
      />
    </div>
  );
}
