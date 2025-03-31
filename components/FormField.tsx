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
}: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
}) {
return (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <Input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="w-full"
            radius="sm"
            required={required}
            disabled={disabled}
            autoComplete={autoComplete}
        />
    </div>
);
}