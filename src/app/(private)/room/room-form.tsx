"use client";

import React from "react";
import * as yup from "yup";
import { Button, Divider, Flex, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
import { roomApi } from "@/apis";
import { message } from "@/utils/message";
import { errorParse } from "@/utils/errorParse";
import PageContent from "@/libs/page-content/page";
import { TextField } from "@/libs/form/text-field";
import { NumberField } from "@/libs/form/number-field";
import { SwitchField } from "@/libs/form/switch-field";

const formSchema = yup.object({
  ner: yup.string().required("Заавал бөглөнө үү!"),
  dugaar: yup.string().required("Заавал бөглөнө үү!"),
  davhar: yup.string().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function RoomForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await roomApi.update(payload._id, {
          ner: values.ner,
          dugaar: values.dugaar,
          davhar: values.davhar,
          isActive: values.isActive,
        });
      } else {
        await roomApi.create({
          ner: values.ner,
          dugaar: values.dugaar,
          davhar: values.davhar,
          isActive: values.isActive,
        });
      }
      message.success("Таны хүсэлт амжилттай.");
      onCancel && onCancel();
    } catch (err) {
      errorParse(err);
    } finally {
      setLoading(false);
    }
  };

  const [data] = React.useState({
    ner: payload?.ner || "",
    dugaar: payload?.dugaar || "",
    davhar: payload?.davhar || "",
    isActive: payload?.isActive || false,
  });

  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={data}
        validationSchema={formSchema}
      >
        {({ values, setFieldValue }) => (
          <>
            <PageContent
              title="Өрөөний мэдээлэл"
              description="Өрөөний үндсэн мэдээлэл."
              extra={[
                <Flex justify="center" align="center" key={0} mr={15}>
                  <SwitchField name="isActive" label="Төлөв" />
                </Flex>,
                <Button
                  key={1}
                  onClick={() => onCancel && onCancel()}
                  size="sm"
                  variant="default"
                  mr={15}
                >
                  Буцах
                </Button>,
                <Button key={2} type="submit" size="sm" loading={loading}>
                  Хадгалах
                </Button>,
              ]}
            >
              <Divider my={20} />
              <Grid>
                <Grid.Col span={{ base: 12, xl: 6 }}>
                  <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="ner"
                        label="Нэр"
                        placeholder="Нэр"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="dugaar"
                        label="Өрөө"
                        placeholder="Өрөө"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <NumberField
                        name="davhar"
                        label="Давхар"
                        placeholder="Давхар"
                        required
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </PageContent>
          </>
        )}
      </Form>
    </>
  );
}
