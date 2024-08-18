"use client";

import React from "react";
import * as yup from "yup";

import { Grid } from "@mantine/core";
import { useSelector } from "react-redux";
import { Form } from "@/libs/form";
import { message } from "@/utils/message";
import { IGeneral } from "@/interface/general";
import { errorParse } from "@/utils/errorParse";
import { TimeField } from "@/libs/form/time-field";
import { SelectField } from "@/libs/form/select-field";
import { DatePickerField } from "@/libs/form/datepickerinput-field";
import { serviceApi } from "@/apis";

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

export default function TimeSet({ payload, onCancel }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { uilchilgees, ajiltans } = useSelector(
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
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <SelectField
                name="uilchilgee"
                required
                placeholder="Үйлчилгээ"
                label="Үйлчилгээ"
                options={(uilchilgees || []).map((item: any) => ({
                  label: item.ner,
                  value: item._id,
                }))}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <SelectField
                name="uilchluulegch"
                required
                placeholder="Үйлчлүүлэгч сонгох"
                label="Үйлчлүүлэгч сонгох"
                options={(uilchilgees || []).map((item: any) => ({
                  label: item.ner,
                  value: item._id,
                }))}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <SelectField
                name="emch"
                required
                placeholder="Эмч сонгох"
                label="Эмч сонгох"
                options={(ajiltans || []).map((item: any) => ({
                  label: item.ner,
                  value: item._id,
                }))}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <DatePickerField
                valueFormat="YYYY оны MM сарын DD өдөр"
                name="udur"
                label="Өдөр сонгох"
                placeholder="Өдөр сонгох"
                required
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TimeField
                name="tsag"
                label="Цаг сонгох"
                placeholder="Цаг сонгох"
                required
              />
            </Grid.Col>
          </Grid>
        )}
      </Form>
    </>
  );
}
