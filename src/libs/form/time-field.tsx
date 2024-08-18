import { InputBaseProps } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useField } from ".";

interface TimeInputProps extends InputBaseProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isUpperCase?: boolean;
  placeholder?: string;
}

export function TimeField({
  name,
  onChange: $onChnage,
  value: $value,
  isUpperCase,
  placeholder,
  ...rest
}: TimeInputProps) {
  const { value, error, onChange } = useField(name);

  return (
    <TimeInput
      {...rest}
      placeholder={placeholder}
      error={error}
      value={$value || value}
      onChange={(e) => {
        $onChnage && $onChnage(e);
        isUpperCase
          ? onChange(e.target.value?.toUpperCase())
          : onChange(e.target.value);
      }}
    />
  );
}
