import React from "react";
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
  inputMode,
  max,
  pattern,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onValueChange?: (value: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  max?: string;
  pattern?: string;
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
        classNames={{
          input: "text-base",
          inputWrapper: "min-h-12",
        }}
        disabled={disabled}
        id={name}
        inputMode={inputMode}
        max={max}
        name={name}
        pattern={pattern}
        placeholder={placeholder}
        radius="sm"
        required={required}
        size="lg"
        type={type}
        onChange={handleChange}
      />
    </div>
  );
}
