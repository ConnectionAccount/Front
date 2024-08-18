"use client";

import Link from "next/link";
import { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { usePathname } from "next/navigation";
import classes from "./NavbarLinksGroup.module.css";

const regex = /^\/[^/]*/;

const checkIsActive = (link: string, pathname: string) => {
  const isActive =
    link !== "/"
      ? pathname.match(regex)?.toString() === link
      : pathname === link;
  return isActive;
};
interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  childrens?: {
    label: string;
    link: string;
  }[];
}

const RenderButton = ({
  handleButton,
  icon: Icon,
  label,
  hasChildrens,
  opened,
  link,
  pathname,
}: {
  handleButton: () => void;
  icon: React.FC<any>;
  label: string;
  hasChildrens: boolean;
  opened: boolean;
  link?: string;
  pathname: string;
}) => {
  const isActive = checkIsActive(link || "", pathname);
  return (
    <UnstyledButton
      onClick={handleButton}
      data-active={isActive}
      className={classes.control}
    >
      <Group justify="space-between" gap={0}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon variant="light" size={40} className={classes.icon}>
            <Icon style={{ width: rem(20), height: rem(20) }} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
        {hasChildrens && (
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            style={{
              width: rem(16),
              height: rem(16),
              transform: opened ? "rotate(-90deg)" : "none",
            }}
          />
        )}
      </Group>
    </UnstyledButton>
  );
};

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  childrens,
}: LinksGroupProps) {
  const pathname = usePathname();
  const hasLinks = childrens;

  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (childrens || []).map((link) => (
    <Link href={link.link} key={link.label}>
      <Text
        className={classes.link}
        data-active={checkIsActive(link.link || "", pathname)}
      >
        {link.label}
      </Text>
    </Link>
  ));

  const handleButton = () => {
    setOpened((o) => !o);
  };

  return (
    <>
      {link ? (
        <Link href={link}>
          <RenderButton
            handleButton={handleButton}
            icon={Icon}
            label={label}
            hasChildrens={!!childrens}
            opened={opened}
            link={link}
            pathname={pathname}
          />
        </Link>
      ) : (
        <RenderButton
          handleButton={handleButton}
          icon={Icon}
          label={label}
          hasChildrens={!!childrens}
          opened={opened}
          link={link}
          pathname={pathname}
        />
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
