/* eslint-disable no-useless-escape */

"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Card, Divider, Flex, Grid, Group, Text } from "@mantine/core";
import * as yup from "yup";
import { Form } from "@/libs/form";
import { authApi } from "@/apis";
import { message } from "@/utils/message";
import { setToken } from "@/store/auth-slice";
import { PasswordField } from "@/libs/form/password-filed";

const formSchema = yup.object({
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "8 тэмдэгт, нэг том, нэг жижиг, нэг тоо, нэг тусгай үсэг агуулсан байх ёстой",
    )

    .optional(),
  password: yup
    .string()
    .required("Нууц үг оруулана уу")
    .oneOf([yup.ref("password")], "Нууц үг таарахгүй байна"),
});

export default function PasswordChangePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card padding="lg" style={{ width: 320 }}>
        <Flex direction="column" mb={10}>
          <Text size="xl" fw="700" c="#1177E8">
            Digital med
          </Text>
          <Text size="xs" c="dimmed">
            Нууц үг шинэчлэх хэсэг
          </Text>
        </Flex>
        <Form
          initialValues={{
            password: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const fixedValues = {
                password: values.password,
              };
              const res = await authApi.changePassword(fixedValues);
              dispatch(setToken(res));
              router.push("/login");
              message.success("Нууц үг амжилттай солигдлоо.");
            } catch (error: any) {
              message.error(error.message);
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={formSchema}
        >
          {() => (
            <>
              <Grid>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <PasswordField name="newPassword" placeholder="Нууц үг" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <PasswordField name="password" placeholder="Нууц үг давтах" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
                  <Button type="submit" fullWidth loading={loading}>
                    Нууц үг шинэчлэх
                  </Button>
                </Grid.Col>
              </Grid>
              <Group mt="xs" justify="center">
                <Text size="xs" c="#303030" fw={400}>
                  Нэврэх хэсэгрүү буцах бол
                  <Link href="/login">
                    <Text mx="3px" span inherit fw={500}>
                      энд дарна уу!
                    </Text>
                  </Link>
                </Text>
              </Group>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}
