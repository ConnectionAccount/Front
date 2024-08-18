import {
  Group,
  Avatar,
  Burger,
  Menu,
  UnstyledButton,
  Text,
  rem,
  Flex,
} from "@mantine/core";
import clsx from "clsx";
import { IconChevronDown, IconLogout, IconUser } from "@tabler/icons-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import classes from "./header.module.css";
import { logout } from "@/store/auth-slice";
import { message } from "@/utils/message";
import { RootState } from "@/store";

export default function Header({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [userMenuOpened, setUserMenuOpened] = React.useState(false);
  const logOut = async () => {
    try {
      dispatch(logout());
      router.push("/login");
    } catch (error: any) {
      message.error("Алдаа гарлаа");
    }
  };

  return (
    <div className={classes.header}>
      <Group justify="space-between" align="center" h="100%">
        <Flex gap={10} align="center" ml="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Text size="xl" fw={900}>
            Digital med
          </Text>
          {/* <Text
            size="md"
            fw={600}
            c="#1177E8"
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            хүлээн авах
          </Text> */}
        </Flex>
        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton
              className={clsx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              {user && (
                <Group gap={7}>
                  <Avatar
                    src={user.logo?.sm}
                    alt={user.email}
                    radius="xl"
                    size={24}
                  />
                  <Text fw={400} size="sm" lh={1} mr={3}>
                    {user.email}
                  </Text>
                  <IconChevronDown
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </Group>
              )}
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                router.push("/profile");
              }}
              leftSection={
                <IconUser
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Миний мэдээлэл
            </Menu.Item>
            <Menu.Item
              onClick={logOut}
              leftSection={
                <IconLogout
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
            >
              Системээс гарах
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}
