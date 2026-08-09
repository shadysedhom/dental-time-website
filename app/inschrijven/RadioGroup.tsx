// Reusable RadioGroup Component
export default function RadioGroup({
  name,
  label,
  options,
  required = false,
  disabled = false,
  value,
  onValueChange,
}: {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </legend>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex min-h-11 cursor-pointer items-center rounded-xl border px-4 py-2.5 transition-colors sm:min-h-0 sm:border-0 sm:bg-transparent sm:p-0 ${
              value === option.value
                ? "border-[#3a4e9d] bg-[#f4f6ff]"
                : "border-slate-200 bg-white"
            }`}
          >
            <input
              checked={value === option.value}
              className="h-5 w-5 border-gray-300 text-primary-700 hover:text-primary-700 focus:ring-primary-700 sm:h-4 sm:w-4"
              disabled={disabled}
              name={name}
              required={required}
              type="radio"
              value={option.value}
              onChange={(e) => onValueChange && onValueChange(e.target.value)}
            />
            <span className="ml-2 text-base text-gray-700 sm:text-sm">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
