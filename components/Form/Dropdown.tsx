import { DropDownArrow } from "@/icons/DropDownArrow";
import clsx from "clsx";
import { useState } from "react";
import { FieldError } from "react-hook-form";

interface DropDownProps {
  options: { key: string; label: string }[];
  currentValue: string | undefined;
  onSelect: (value: string) => void;
  error: string | FieldError | undefined;
  placeholder?: string;
  label?: string;
  buttonstyle?: string;
  optionsStyle?: string;
}

export const DropDown = ({
  options,
  currentValue,
  placeholder,
  onSelect,
  label,
  buttonstyle,
  error,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    currentValue
      ? options.filter((op) => op.key === currentValue)[0]?.label
      : ""
  );

  const closeDropDown = () => {
    setIsOpen(false);
  };

  const toggleDropDown = () => {
    setIsOpen((open) => !open);
  };

  const selectValue = ({ key, label }: { key: string; label: string }) => {
    onSelect(key);
    setSelectedValue(label);
    closeDropDown();
  };

  return (
    <button
      type="button"
      className="relative w-full flex flex-col"
      onBlur={closeDropDown}
    >
      {label && <p className="w-full text-sm mb-3 text-start">{label}</p>}
      <div
        className={clsx({
          "flex items-center justify-between px-4": true,
          "w-full h-12 rounded-lg border border-gray-300 text-gray-500 text-sm bg-white":
            !buttonstyle,
          [buttonstyle || ""]: buttonstyle,
        })}
        onClick={toggleDropDown}
      >
        <p>{selectedValue || placeholder}</p>
        <DropDownArrow />
      </div>

      {error && (
        <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
          <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
            !
          </div>
          <p>{typeof error === "string" ? error : error.message}</p>
        </div>
      )}

      {isOpen && (
        <div className="absolute  w-full border border-gray-300 rounded-lg z-10 bg-white top-full mt-1">
          {options.map((option, index) => {
            return (
              <div key={index}>
                {option.label && (
                  <div
                    className={clsx({
                      "w-full h-12 hover:bg-blue-100 flex items-center text-gray-500 px-4":
                        true,
                      "rounded-b-lg": index === options.length - 1,
                      "rounded-t-lg": index === 0,
                    })}
                    onClick={() => selectValue(option)}
                  >
                    {option.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
};
