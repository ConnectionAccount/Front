import { MultiSelect } from "@mantine/core";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (value: string[] | null) => void;
  options: { value: string; label: string }[];
  noError?: boolean;
};

export function MultiCreateableField({
  name,
  label,
  placeholder,
  onChange: onChangeValue,
  options = [],
  noError = false,
  disabled = false,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      searchable
      onChange={(values) => {
        onChange(values);

        onChangeValue && onChangeValue(values);
      }}
      error={error}
      required
      clearable
      data={options}
      styles={{
        error: {
          display: noError ? "none" : "block",
        },
        wrapper: {
          marginBottom: error && noError && 0,
        },
      }}
      style={{ flex: 1 }}
    />
  );
}
