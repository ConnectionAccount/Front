import { Checkbox, Flex, Input } from "@mantine/core";
import { useField } from ".";

type Props = {
  name: string;
  label?: any;
  position?: "right" | "left";
  children?: string;
  onChangeCustom?: (e: any) => void;
  disabled?: boolean;
};

export function CheckboxField({
  name,
  label,
  position,
  children,
  onChangeCustom,
  disabled,
}: Props) {
  const { value, onChange } = useField(name);

  return (
    <Input.Wrapper label={label}>
      <Flex pt="8px">
        <Checkbox
          disabled={disabled}
          checked={value}
          labelPosition={position}
          label={children}
          value={value}
          onChange={(e) => {
            onChange(e.currentTarget.checked);
            onChangeCustom && onChangeCustom(e.currentTarget.checked);
          }}
        />
      </Flex>
    </Input.Wrapper>
  );
}
