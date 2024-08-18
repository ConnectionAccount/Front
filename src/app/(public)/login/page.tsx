"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Card, Flex, Grid, Group, Text } from "@mantine/core";
import * as yup from "yup";
import { authApi } from "@/apis";
import { Form } from "@/libs/form";
import { message } from "@/utils/message";
import { setToken } from "@/store/auth-slice";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import { PasswordField } from "@/libs/form/password-filed";

const formSchema = yup.object({
  email: yup
    .string()
    .email("Имэйл хаяг оруулна уу!")
    .min(1, "Нэвтрэх нэр оруулна уу")
    .optional(),
  password: yup.string().min(1, "Нууц үг оруулна уу"!),
});

export type SignupInputType = yup.InferType<typeof formSchema>;

function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <Flex h="100vh" align="center" justify="center">
      <Card padding="lg" style={{ width: 320 }}>
        <Flex direction="column" mb={10}>
          <Text size="xl" fw="700" c="#1177E8">
            Digital med
          </Text>
          <Text size="xs" c="dimmed">
            Нэвтрэх хэсэг
          </Text>
        </Flex>

        <Form
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await authApi.login(values);
              console.log("respinse ---->     ", JSON.stringify(res))
              // dispatch(setToken(res));
              // message.success("Амжилттай нэвтэрлээ.");
              // router.push("/");
            } catch (err) {
              errorParse(err);
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={formSchema}
        >
          {() => (
            <>
              <Grid>
                <Grid.Col span={12}>
                  <TextField
                    name="email"
                    placeholder="Нэвтрэх нэр оруулна уу"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PasswordField
                    name="password"
                    placeholder="Нууц үг оруулна уу"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Button size="sm" type="submit" fullWidth loading={loading}>
                    Нэвтрэх
                  </Button>
                </Grid.Col>
              </Grid>
              <Group mt="xs" justify="center">
                <Text size="xs" c="#303030" fw={400}>
                  Та нууц үгээ мартсан бол
                  <Link href="/forgot">
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
    </Flex>
  );
}

export default LoginPage;
