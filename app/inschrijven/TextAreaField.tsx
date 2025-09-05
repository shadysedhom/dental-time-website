import { Textarea } from "@heroui/input";

// Reusable TextAreaField Component
export default function TextAreaField({
  label,
  name,
  placeholder,
  disabled = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700 mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Textarea
        className="w-full"
        disabled={disabled}
        id={name}
        name={name}
        placeholder={placeholder}
        radius="sm"
      />
    </div>
  );
}
