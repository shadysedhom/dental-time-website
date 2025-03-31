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
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            className="min-h-[120px] w-full"
            disabled={disabled}
            radius="sm"
        />
    </div>
);
}
