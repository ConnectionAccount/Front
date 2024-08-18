/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput } from "@mantine/dates";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  icon?: any;
  styles?: any;
  noError?: boolean;
  onChange?: any;
  required?: boolean;
  defaultValue?: any;
};

export function DatePickerReceipt({
  name,
  label,
  placeholder,
  disabled = false,
  icon,
  styles,
  noError = false,
  required = false,
  defaultValue,
  onChange: onChangeValue,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <>
      <DateInput
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        radius="sm"
        valueFormat="MM-DD-YYYY"
        error={error}
        clearable={false}
        rightSection={icon}
        value={value || defaultValue}
        onChange={(e: any) => {
          onChange(new Date(e).toISOString());
          onChangeValue && onChangeValue(new Date(e).toISOString());
        }}
        required={required}
        styles={{
          error: {
            display: noError ? "none" : "block",
          },
          cell: {
            padding: "0px !important",
          },
          ...styles,
        }}
      />
    </>
  );
}
