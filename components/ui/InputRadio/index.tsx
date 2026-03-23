import React from "react";

type InputRadioProps = {
  id: string;
  name: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDefault: boolean | undefined;
};

export default function InputRadio({
  id,
  name,
  label,
  handleChange,
  isDefault = false,
}: InputRadioProps) {
  return (
    <>
      <input
        type="radio"
        className="sr-only peer"
        id={id}
        name={name}
        defaultChecked={isDefault}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className="cursor-pointer border px-2 py-1 text-sm border-gray-400 rounded-sm peer-checked:border-blue-400 peer-checked:text-blue-400 transition-colors hover:border-blue-500"
      >
        {label}
      </label>
    </>
  );
}
