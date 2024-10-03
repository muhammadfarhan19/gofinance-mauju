import { Combobox } from "@headlessui/react";
import React, { ChangeEvent } from "react";
import { classNames } from "./Pagination";
import { CheckIcon } from "@heroicons/react/16/solid";

export interface OptionType {
  text: string;
  value: string;
}

interface AutoCompleteProps {
  defaultValue?: OptionType;
  label: string | React.ReactNode;
  onChange: (value: OptionType) => void;
  options: OptionType[];
  onQueryChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  additionalComponent?: any;
}

export default function AutoComplete(props: AutoCompleteProps) {
  const {
    defaultValue,
    label,
    onChange,
    onQueryChange,
    options,
    placeholder,
    disabled,
  } = props;
  const [query, setQuery] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<
    OptionType | undefined
  >(defaultValue);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.text.toLowerCase().includes(query.toLowerCase());
        });

  const handleOnChange = (comboBoxValue: OptionType) => {
    onChange(comboBoxValue);
    setSelectedValue(comboBoxValue);
  };

  const handleQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onQueryChange && typeof onQueryChange === "function") {
      onQueryChange(value);
    }
    setQuery(value);
  };

  return (
    <Combobox
      as="div"
      value={selectedValue}
      onChange={handleOnChange}
      disabled={disabled}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          autoComplete="off"
          className="w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 disabled:bg-gray-200 sm:text-sm"
          onChange={handleQueryChanged}
          displayValue={(optionDisplay: OptionType) =>
            optionDisplay?.text || ""
          }
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {/* <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-teal-400 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected ? "font-semibold" : ""
                      )}
                    >
                      {option.text}
                    </span>
                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-teal-400"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
            {props.additionalComponent}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
