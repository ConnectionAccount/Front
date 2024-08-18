import { Textarea } from "@mantine/core";
import { useField } from ".";

type Props = {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder: string;
  maxRows?: number;
  maxLenght?: number;
  width?: number | string;
  height?: number | string;
  autosize?: boolean;
  minRows?: number;
  readOnly?: boolean;
  withAsterisk?: boolean;
};

export function TextareaField({
  name,
  label,
  placeholder,
  disabled = false,
  maxRows,
  maxLenght,
  width,
  height,
  autosize = true,
  minRows = 3,
  withAsterisk = false,
  readOnly,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <Textarea
      withAsterisk={withAsterisk}
      readOnly={readOnly}
      w={width}
      h={height}
      minRows={minRows}
      mah={500}
      maxRows={maxRows || 5}
      maxLength={maxLenght || 200}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      autosize={autosize}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
