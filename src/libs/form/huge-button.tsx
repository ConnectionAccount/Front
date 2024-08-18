import { Button, Flex, Text } from "@mantine/core";

type Props = {
  label: any;
  description?: any;
  onClick: () => void;
  icon?: any;
  h?: string;
  variant?: string;
  loading?: boolean;
  error?: any;
  color?: any;
};

export default function HugeButton({
  label,
  onClick,
  description,
  color,
  icon,
  loading = false,
  variant = "default",
  h,
  error,
}: Props) {
  return error ? (
    <Button
      mb="2px"
      onClick={onClick}
      h={h}
      fullWidth
      variant={variant}
      radius="md"
      justify="space-between"
      leftSection={icon}
      loading={loading}
    >
      <Flex justify="center" direction="column" gap="5px" align="end">
        <Flex c="red">{label}</Flex>
        <Text c="red">Сонголтоо хийнээ үү</Text>
      </Flex>
    </Button>
  ) : (
    <Button
      mb="2px"
      onClick={onClick}
      h={h}
      fullWidth
      variant={variant}
      radius="md"
      justify="space-between"
      color={color}
      leftSection={icon}
      loading={loading}
    >
      <Flex justify="center" direction="column" gap="2px" align="end">
        {label}
        {description}
      </Flex>
    </Button>
  );
}
