"use client";

import React from "react";
import { RadioGroup, Radio } from "@heroui/react";
import { Input } from "@heroui/input";
import { useState } from "react";

type MedicalQuestionProps = {
  question: string;
  options: string[];
  name: string;
  onValueChange: (value: { answer: string; details?: string }) => void;
  required?: boolean;
};

export default function MedicalQuestion({
  question,
  options,
  name,
  onValueChange,
  required = false,
}: MedicalQuestionProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [details, setDetails] = useState("");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
    onValueChange({ answer: value, details: value === "Ja" ? details : "" });
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDetails = e.target.value;

    setDetails(newDetails);
    onValueChange({ answer: selectedValue, details: newDetails });
  };

  const showDetailsInput =
    selectedValue === "Ja" && options.some((opt) => opt.includes("-->"));

  return (
    <div className="py-4 border-b">
      <label className="font-semibold text-gray-800">
        {question} {required && <span className="text-red-500">*</span>}
      </label>
      <RadioGroup
        className="mt-2"
        isRequired={required}
        name={name}
        value={selectedValue}
        onValueChange={handleRadioChange}
      >
        {options.map((option) => (
          <Radio
            key={`${name}-${option.split("-->")[0].trim()}`}
            className="min-h-11 py-2"
            value={option.split("-->")[0].trim()}
          >
            {option.split("-->")[0].trim()}
          </Radio>
        ))}
      </RadioGroup>
      {showDetailsInput && (
        <div className="mt-2 sm:ml-6">
          <Input
            classNames={{
              input: "text-base",
              inputWrapper: "min-h-12",
            }}
            isRequired
            name={`${name}-details`}
            placeholder={options
              .find((opt) => opt.startsWith("Ja -->"))
              ?.split("-->")[1]
              .trim()}
            value={details}
            size="lg"
            onChange={handleDetailsChange}
          />
        </div>
      )}
    </div>
  );
}
