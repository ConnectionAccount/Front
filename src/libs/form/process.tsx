import { IconCheck } from "@tabler/icons-react";
import { ActionIcon, Badge, Divider, Flex, Text } from "@mantine/core";

type Props = {
  label: string;
  type?: boolean | undefined;
  number: string;
  onClick?: any;
  isDivider?: boolean;
};

export default function Process({
  label,
  number,
  onClick,
  type = true,
  isDivider = true,
}: Props) {
  return (
    <Flex direction="column">
      <Flex gap="sm" align="center">
        {type ? (
          <ActionIcon color="green" onClick={onClick}>
            <IconCheck style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        ) : (
          <ActionIcon color="orange" onClick={onClick}>
            {number}
          </ActionIcon>
        )}
        <Flex direction="column">
          <Text fw={500} size="sm" style={{ whiteSpace: "nowrap" }}>
            {label}
          </Text>
          {type ? (
            <Badge variant="light" color="green" radius="sm">
              Үйлдэл амжилттай
            </Badge>
          ) : (
            <Badge variant="light" color="orange">
              Хүлээгдэж буй
            </Badge>
          )}
        </Flex>
      </Flex>
      {isDivider &&
        (type ? (
          <Flex w="30" justify="center">
            <Divider size="sm" orientation="vertical" h={30} color="green" />
          </Flex>
        ) : (
          <Flex w="30" justify="center">
            <Divider size="sm" orientation="vertical" h={30} color="orange" />
          </Flex>
        ))}
    </Flex>
  );
}
