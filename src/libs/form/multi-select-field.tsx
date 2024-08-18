import { IconChevronDown } from "@tabler/icons-react";
import { MultiSelect } from "@mantine/core";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (value: string[] | null) => void;
  options: { value: string; label: string }[];
};

export function MultiSelectField({
  name,
  label,
  placeholder,
  onChange: onChangeValue,
  options,
  required,
  disabled = false,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      value={value || []}
      disabled={disabled}
      onChange={(values) => {
        onChange(values);
        onChangeValue && onChangeValue(values);
      }}
      rightSection={<IconChevronDown size={16} color="gray" />}
      error={error}
      nothingFoundMessage="Сонголт байхгүй байна"
      withAsterisk={required}
      hidePickedOptions
      data={options}
    />
  );
}
