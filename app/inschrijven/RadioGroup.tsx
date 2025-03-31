// Reusable RadioGroup Component
export default function RadioGroup({
    name,
    label,
    options,
    required = false,
    disabled = false,
}: {
    name: string;
    label?: string;
    options: { value: string; label: string }[];
    required?: boolean;
    disabled?: boolean;
}) {
return (
    <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </legend>

        <div className="flex items-center space-x-4 mt-2">
            {options.map((option) => (
                <label key={option.value} className="flex items-center">
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        className="h-4 w-4 text-primary-700 border-gray-300 hover:text-primary-700 focus:ring-primary-700"
                        required={required}
                        disabled={disabled}
                    />
                    <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                </label>
            ))}
        </div>
    </fieldset>
);
}