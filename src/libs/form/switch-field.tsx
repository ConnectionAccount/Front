import { Switch, rem, Flex, Input, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useField } from ".";

type Props = {
  name: string;
  label?: any;
  onChangeCustom?: (e: any) => void;
  disabled?: boolean;
};

export function SwitchField({ name, label, onChangeCustom, disabled }: Props) {
  const { value, onChange } = useField(name);

  return (
    <Input.Wrapper>
      <Flex gap={10}>
        <Text c={value ? "teal" : "red"}>{label}</Text>
        <Switch
          disabled={disabled}
          value={value}
          checked={value}
          onChange={(e) => {
            onChangeCustom && onChangeCustom(e.currentTarget.checked);
            onChange(e.currentTarget.checked);
          }}
          color="teal"
          size="md"
          thumbIcon={
            value ? (
              <IconCheck
                style={{ width: rem(12), height: rem(12) }}
                color="teal"
                stroke={3}
              />
            ) : (
              <IconX
                style={{ width: rem(12), height: rem(12) }}
                color="red"
                stroke={3}
              />
            )
          }
        />
      </Flex>
    </Input.Wrapper>
  );
}
