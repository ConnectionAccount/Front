import { Select, SelectProps } from "@mantine/core";
import { useField } from ".";

interface SelectFieldProps extends SelectProps {
  name: string;
}

export function Select2Field({
  name,
  onChange: $onChnage,
  ...rest
}: SelectFieldProps) {
  const { value, error, onChange } = useField(name);
  return (
    <Select
      {...rest}
      error={error}
      value={value}
      onChange={(currentValue) => {
        $onChnage && $onChnage(currentValue);
        onChange(currentValue);
      }}
      allowDeselect={false}
      checkIconPosition="right"
    />
  );
}
