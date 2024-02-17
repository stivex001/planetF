import { OpenEyeIcon } from "@/icons/CloseEye";
import { FormFields, FormTypes } from "@/models";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form";

export type TextInputProps = {
  label: string;
  fieldName: FormFields;
  placeholder?: string;
  register: FormTypes;
  error: FieldError | undefined;
  className?: string;
  type?: HTMLInputTypeAttribute | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({
  label,
  placeholder,
  fieldName,
  register,
  error,
  className,
  type,
}: TextInputProps) => {
  const [showText, setShowText] = useState(false);

  const togglePassword = () => {
    setShowText((showText) => !showText);
  };
  return (
    <div className="w-full">
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        {label}
      </label>
      <div className="w-full relative">
        <input
          type={type === "password" && !showText ? "password" : "text"}
          {...register(fieldName)}
          placeholder={placeholder}
          className={`relative w-full h-14 rounded-lg py-2 pl-6 pr-16 placeholder:text-gray-400 outline-none text-sm sm:leading-6 border ${className}`}
        />
        {type === "password" && (
          <div className="absolute top-0 right-0 h-full w-14 flex items-center justify-center bg-transparent">
            <button type="button" className="button" onClick={togglePassword}>
              <OpenEyeIcon />
            </button>
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
          <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
            !
          </div>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export const ReadOnlyTextInput = ({
  label,
  placeholder,
  value,
  className,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  className?: string;
}) => {
  return (
    <div className="w-full">
      <label className="block text-base font-medium leading-6 text-gray-900 mb-2">
        {label}
      </label>
      <input
        readOnly={true}
        value={value ?? ''}
        placeholder={placeholder ?? ''}
        className={`w-full h-14 rounded-lg py-2 px-6  placeholder:text-gray-400 outline-none text-sm sm:leading-6 border cursor-not-allowed ${className}`}
      />
    </div>
  );
};
