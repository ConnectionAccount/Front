import { DatePickerInput } from "@mantine/dates";
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
  readOnly?: boolean;
  valueFormat?: any;
  w?: string;
  defaultDate?: any;
};

export function DatePickerField({
  name,
  label,
  placeholder,
  disabled = false,
  icon,
  styles,
  valueFormat,
  noError = false,
  required = false,
  onChange: onChangeValue,
  readOnly,
  w,
  defaultDate,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <>
      <DatePickerInput
        locale="mn"
        valueFormat={valueFormat || "MM сарын DD өдөр"}
        monthLabelFormat="YYYY / MM сар"
        yearLabelFormat="YYYY"
        w={w}
        readOnly={readOnly}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        radius="sm"
        error={error}
        clearable={false}
        rightSection={icon}
        value={value ? new Date(value) : null || defaultDate}
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
