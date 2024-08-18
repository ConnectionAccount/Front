import { NumberInput, NumberInputStylesNames } from "@mantine/core";
import React from "react";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  noError?: boolean;
  hideControls?: boolean;
  max?: number | undefined;
  errors?: any;
  styles?: any;
  readOnly?: boolean;
  required?: boolean;
  rightSection?: any;
  w?: any;
};

export function NumberField({
  name,
  label,
  noError = false,
  hideControls = true,
  placeholder,
  disabled = false,
  required = false,
  max,
  errors,
  styles,
  rightSection,
  readOnly,
  w,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <>
      <NumberInput
        w={w}
        required={required}
        readOnly={readOnly}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        error={errors || error}
        value={value}
        hideControls={hideControls}
        onChange={(v) => onChange(v)}
        max={max}
        styles={{
          error: {
            display: noError ? (errors ? "block" : "none") : "block",
            marginBottom: errors ? -7 : 0,
          },
          wrapper: {
            marginBottom: error && noError && 0,
            marginTop: errors ? 10 : 0,
          },

          ...styles,
        }}
        rightSection={rightSection}
      />
    </>
  );
}
