"use client";

import { useId } from "react";
import Select, { type MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export type OptionType = {
  value: string;
  label: string;
};

export function ReactSelect({
  options,
  defaultValues,
  name,
  selectedValues,
  setSelectedValues,
}: {
  options: MultiValue<OptionType>;
  defaultValues: MultiValue<OptionType>;
  name: string;
  selectedValues: MultiValue<OptionType>;
  setSelectedValues: (values: MultiValue<OptionType>) => void;
}) {
  const id = useId();

  return (
    <Select
      instanceId={id}
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={defaultValues}
      isMulti
      options={options}
      value={selectedValues}
      onChange={(values) => {
        setSelectedValues(values);
      }}
      name={name}
    />
  );
}
