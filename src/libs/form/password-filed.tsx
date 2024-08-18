import { PasswordInput, PasswordInputStylesNames } from "@mantine/core";
import { useField } from ".";

type Props = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder: string;
  noError?: boolean;
  rightSection?: React.ReactNode;
  classNames?: Partial<Record<PasswordInputStylesNames, string>> | undefined;
  variant?: string;
  className?: string;
  styles?: string[];
  radius?: number | string;
  size?: string | undefined;
};

export function PasswordField({
  name,
  label,
  noError = false,
  placeholder,
  disabled = false,
  rightSection,
  classNames,
  variant,
  className,
  styles,
  radius,
  size,
}: Props) {
  const { value, error, onChange } = useField(name);

  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      error={error}
      value={value}
      radius={radius}
      color="white"
      size={size}
      className={className}
      classNames={classNames}
      rightSection={rightSection}
      onChange={(e) => onChange(e.target.value)}
      variant={variant}
      styles={{
        error: {
          display: noError ? "none" : "block",
          marginTop: -5,
        },
        wrapper: {
          marginBottom: noError && error && 0,
        },
        ...styles,
      }}
      required
    />
  );
}
