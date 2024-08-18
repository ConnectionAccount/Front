import { TextInput, InputBaseProps } from "@mantine/core";
import { useField } from ".";

interface TextInputProps extends InputBaseProps {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  isUpperCase?: boolean;
  placeholder?: string;
  type?: any;
}

export function TextField({
  name,
  onChange: $onChnage,
  value: $value,
  isUpperCase,
  placeholder,
  type,
  ...rest
}: TextInputProps) {
  const { value, error, onChange } = useField(name);

  return (
    <TextInput
      {...rest}
      type={type}
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
