"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Card, Divider, Flex, Grid, Group, Text } from "@mantine/core";
import * as yup from "yup";
import { Form } from "@/libs/form";
import { authApi, otpApi } from "@/apis";
import { message } from "@/utils/message";
import { setToken } from "@/store/auth-slice";
import { TextField } from "@/libs/form/text-field";

const formSchema = yup.object({
  email: yup.string().min(1, "Нэвтрэх нэр оруулна уу").optional(),
});

export type SignupInputType = yup.InferType<typeof formSchema>;

export default function ForgotPage() {
  const router = useRouter();
  const dispatch = useDispatch();
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
            email: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await authApi.forgot(values);

              dispatch(setToken(res));

              await otpApi.otp({
                otpMethod: "FORGOT",
                email: values.email,
              });
              message.success("Баталгаажуулах нууц үг илгээлээ.");
              router.push("/forgot-otp");
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
                <Grid.Col span={12}>
                  <TextField
                    name="email"
                    placeholder="Имэйл хаяг оруулна уу!"
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Flex gap={6}>
                    <Button size="sm" type="submit" fullWidth loading={loading}>
                      Үргэлжлүүлэх
                    </Button>
                  </Flex>
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
