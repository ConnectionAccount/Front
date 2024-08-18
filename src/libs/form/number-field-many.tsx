import { NumberInput } from "@mantine/core";
import React from "react";
import { useField } from ".";

type NumberFieldsProps = {
  name: string;
  disabled?: boolean;
  placeholder: string;
  errorCallback: (error: string) => void;
};

const NumberField = React.memo(
  ({ name, placeholder, disabled = false, errorCallback }: NumberFieldsProps) => {
    const { value, error, onChange } = useField(name);

    React.useEffect(() => {
      errorCallback(error);
    }, [error, errorCallback]);

    return (
      <NumberInput
        disabled={disabled}
        error={!!error}
        value={value}
        onChange={(v) => onChange(v)}
        placeholder={placeholder}
        hideControls
        classNames={{}}
      />
    );
  }
);

NumberField.displayName = "NumberField";

export { NumberField };
