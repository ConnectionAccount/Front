"use client";

import React from "react";
import * as yup from "yup";
import { Button, Divider, Flex, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
import { timeTableApi } from "@/apis";
import { message } from "@/utils/message";
import { errorParse } from "@/utils/errorParse";
import PageContent from "@/libs/page-content/page";
import { TimeField } from "@/libs/form/time-field";
import { SelectField } from "@/libs/form/select-field";
import { TextField } from "@/libs/form/text-field";
import { SwitchField } from "@/libs/form/switch-field";

const formSchema = yup.object({
  odorSongoh: yup.string().required("Заавал бөглөнө үү!"),
  tsainiiTsagEhleh: yup.string().required("Заавал бөглөнө үү!"),
  tsainiiTsagDuusah: yup.string().required("Заавал бөглөнө үү!"),
  ehlehTsag: yup.string().required("Заавал бөглөнө үү!"),
  duusahTsag: yup.string().required("Заавал бөглөнө үү!"),
  ner: yup.string().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function TsagiinHuvaariForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await timeTableApi.update(payload._id, {
          ner: values.ner,
          odorSongoh: values.odorSongoh,
          tsainiiTsagEhleh: values.tsainiiTsagEhleh,
          tsainiiTsagDuusah: values.tsainiiTsagDuusah,
          ehlehTsag: values.ehlehTsag,
          duusahTsag: values.duusahTsag,
          isActive: values.isActive,
        });
      } else {
        await timeTableApi.create({
          ner: values.ner,
          odorSongoh: values.odorSongoh,
          tsainiiTsagEhleh: values.tsainiiTsagEhleh,
          tsainiiTsagDuusah: values.tsainiiTsagDuusah,
          ehlehTsag: values.ehlehTsag,
          duusahTsag: values.duusahTsag,
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
    odorSongoh: payload?.odorSongoh || "",
    tsainiiTsagEhleh: payload?.tsainiiTsagEhleh || "",
    tsainiiTsagDuusah: payload?.tsainiiTsagDuusah || "",
    ehlehTsag: payload?.ehlehTsag || "",
    duusahTsag: payload?.duusahTsag || "",
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
              title="Цагийн хуваарийн мэдээлэл"
              description="Цагийн хуваарийн үндсэн мэдээлэл."
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
                      <TextField name="ner" label="Нэр" placeholder="Нэр" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <SelectField
                        required
                        name="odorSongoh"
                        label="Өдөр сонгох"
                        placeholder="Өдөр сонгох"
                        options={[
                          {
                            label: "Ажлын өдөр",
                            value: "Ажлын өдөр",
                          },
                          { label: "Амралтын өдөр", value: "Амралтын өдөр" },
                        ]}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TimeField
                        name="ehlehTsag"
                        label="Ажил эхлэх цаг"
                        placeholder="Ажил эхлэх цаг"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TimeField
                        name="duusahTsag"
                        label="Ажил дуусах цаг"
                        placeholder="Ажил дуусах цаг"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TimeField
                        name="tsainiiTsagEhleh"
                        label="Цайны цаг эхлэх"
                        placeholder="Цайны цаг эхлэх"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TimeField
                        name="tsainiiTsagDuusah"
                        label="Цайны цаг дуусах"
                        placeholder="Цайны цаг дуусах"
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
