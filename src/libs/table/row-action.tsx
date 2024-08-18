import { Flex } from "@mantine/core";

type Props = {
  extra: { [key: string]: string | JSX.Element | false };
  onClick?: (key: string) => void;
  disabled?: boolean;
};

export function RowAction({ extra, onClick, disabled }: Props) {
  return (
    <Flex gap="sm" style={{ justifyContent: "center" }}>
      {Object.keys(extra)
        .filter((ext) => ext)
        .map((key, index) => (
          <Flex key={index} onClick={() => onClick && onClick(key)}>
            {extra[key]}
          </Flex>
        ))}
    </Flex>
  );
}
