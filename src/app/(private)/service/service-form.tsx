"use client";

import React from "react";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Button, Divider, Grid } from "@mantine/core";
import { Form } from "@/libs/form";
import { serviceApi } from "@/apis";
import { message } from "@/utils/message";
import { IGeneral } from "@/interface/general";
import { errorParse } from "@/utils/errorParse";
import { TextField } from "@/libs/form/text-field";
import PageContent from "@/libs/page-content/page";
import { NumberField } from "@/libs/form/number-field";
import { SelectField } from "@/libs/form/select-field";
import { MultiSelectField } from "@/libs/form/multi-select-field";

const formSchema = yup.object({
  une: yup.string().required("Заавал бөглөнө үү!"),
  ner: yup.string().required("Заавал бөглөнө үү!"),
  kvot: yup.string().required("Заавал бөглөнө үү!"),
  tasag: yup.string().required("Заавал бөглөнө үү!"),
  torol: yup.string().required("Заавал бөглөнө үү!"),
  uruuId: yup.array().required("Заавал бөглөнө үү!"),
  ajiltanId: yup.array().required("Заавал бөглөнө үү!"),
  tsagiinHuvaariId: yup.array().required("Заавал бөглөнө үү!"),
});

type Props = {
  payload?: any;
  onCancel?: (reload?: boolean) => void;
};

export default function ServiceForm({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { ajiltans, uruus, tsags, tasags } = useSelector(
    (state: { general: IGeneral }) => state.general,
  );

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (payload) {
        await serviceApi.update(payload._id, {
          une: values.une,
          ner: values.ner,
          kvot: values.kvot,
          tasag: values.tasag,
          torol: values.torol,
          uruuId: values.uruuId,
          ajiltanId: values.ajiltanId,
          tsagiinHuvaariId: values.tsagiinHuvaariId,
        });
      } else {
        await serviceApi.create({
          une: values.une,
          ner: values.ner,
          kvot: values.kvot,
          tasag: values.tasag,
          torol: values.torol,
          uruuId: values.uruuId,
          ajiltanId: values.ajiltanId,
          tsagiinHuvaariId: values.tsagiinHuvaariId,
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
    une: payload?.une || "",
    ner: payload?.ner || "",
    kvot: payload?.kvot || "",
    tasag: payload?.tasag || "",
    torol: payload?.torol || "",
    uruuId: payload?.uruuId || [],
    ajiltanId: payload?.ajiltanId || [],
    tsagiinHuvaariId: payload?.tsagiinHuvaariId || [],
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
              title="Ажилтны мэдээлэл"
              description="Ажилтны үндсэн мэдээлэл."
              extra={[
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
                        name="torol"
                        label="Төрөл"
                        placeholder="Төрөл"
                        required
                      />
                    </Grid.Col>
                    {/* <Grid.Col span={{ base: 12, md: 6 }}>
                      <MultiSelectField
                        name="tasag"
                        required
                        placeholder="Тасаг"
                        label="Тасаг"
                        options={(tasags || []).map((item: any) => ({
                          label: item.ner,
                          value: item._id,
                        }))}
                      />
                    </Grid.Col> */}
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <SelectField
                        name="tasag"
                        required
                        placeholder="Тасаг"
                        label="Тасаг"
                        options={(tasags || []).map((item: any) => ({
                          label: item.ner,
                          value: item._id,
                        }))}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <MultiSelectField
                        name="uruuId"
                        required
                        placeholder="Өрөө"
                        label="Өрөө"
                        options={(uruus || []).map((item: any) => ({
                          label: item.dugaar,
                          value: item._id,
                        }))}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <MultiSelectField
                        name="ajiltanId"
                        required
                        placeholder="Ажилтан"
                        label="Ажилтан"
                        options={(ajiltans || []).map((item: any) => ({
                          label: item.email,
                          value: item._id,
                        }))}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <MultiSelectField
                        name="tsagiinHuvaariId"
                        required
                        placeholder="Цагийн хуваарь"
                        label="Цагийн хуваарь"
                        options={(tsags || []).map((item: any) => ({
                          label: item.ehlehTsag,
                          value: item._id,
                        }))}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextField
                        name="kvot"
                        label="kvot"
                        placeholder="kvot"
                        required
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <NumberField
                        name="une"
                        label="Үнэ"
                        placeholder="Үнэ"
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
