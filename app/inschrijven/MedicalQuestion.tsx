"use client";

import React from 'react';
import { RadioGroup, Radio } from "@heroui/radio";
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
        name={name}
        value={selectedValue}
        onValueChange={handleRadioChange}
        isRequired={required}
      >
        {options.map((option) => (
          <Radio key={`${name}-${option.split("-->")[0].trim()}`} value={option.split("-->")[0].trim()}>
            {option.split("-->")[0].trim()}
          </Radio>
        ))}
      </RadioGroup>
      {showDetailsInput && (
        <div className="mt-2 ml-6">
          <Input
            name={`${name}-details`}
            placeholder={options
              .find((opt) => opt.startsWith("Ja -->"))
              ?.split("-->")[1]
              .trim()}
            value={details}
            onChange={handleDetailsChange}
          />
        </div>
      )}
    </div>
  );
}
