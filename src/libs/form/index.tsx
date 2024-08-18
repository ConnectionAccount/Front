import React, { FormEvent, useContext, useImperativeHandle } from "react";

type ValueProps = {
  [key: string]: any;
};

type IForm = {
  errors: ValueProps;
  setErrors: (errors: ValueProps) => void;
  values: ValueProps;
  setItems: (name: string, values: any) => void;
  addItem: (name: string, value: any) => void;
  removeItem: (name: string, index: number) => void;
  handleChange: (name: string) => (value: any) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<boolean>;
  setFieldValue: (name: string, value: any) => void;
};

const FormConfig: IForm = {
  errors: {},
  setErrors: () => () => null,
  values: {},
  handleChange: () => () => null,
  setItems: () => () => null,
  removeItem: () => () => null,
  addItem: () => () => null,
  handleSubmit: () => Promise.resolve(true),
  setFieldValue: () => null,
};

const FormContext = React.createContext<IForm>(FormConfig);

type Props = {
  initialValues: ValueProps;
  validationSchema?: any;
  onSubmit?: (values: any) => void;
  children: (props: IForm) => JSX.Element;
};

const deserializeObject = (payload: any, fieldName: string, value: any) =>
  Object.keys(payload || {}).reduce<any>((accumulator, key) => {
    let reduces = accumulator;
    if (Array.isArray(payload[key])) {
      reduces = (payload[key] as any[]).reduce<any>(
        (accumulator1, iterator, index) => {
          let reduces1 = accumulator1 as any;

          if (typeof iterator === "object") {
            reduces1 = deserializeObject(iterator, `${key}[${index}].`, value);
          } else if (iterator?.length > 0) {
            if (!reduces1[`${fieldName}${key}`]) {
              reduces1[`${fieldName}${key}`] = [];
            }

            reduces1[`${fieldName}${key}`][`${index}`] = iterator;
          } else {
            reduces1[`${fieldName}${key}[${index}]`] = iterator;
          }

          return reduces1;
        },
        reduces,
      );
    } else if (typeof payload[key] === "object") {
      reduces = deserializeObject(payload[key], `${fieldName + key}.`, value);
    } else {
      reduces[fieldName + key] = payload[key];
    }

    return reduces;
  }, value);

const deserializeData = (data: any) => deserializeObject(data, "", {});
const serializeObject = (fields: string[], payload: any, value: any) => {
  const array = fields;
  const reduces = payload;

  const key = array.shift();
  if (!key) return value || reduces;

  if (key.indexOf("[") !== -1) {
    const field = key.split("[")[0];

    if (!field) return reduces;

    const index = parseInt(`${key.split("[")[1]?.replace("]", "")}`, 10);

    if (!reduces[field]) reduces[field] = [];
    if (!reduces[field][index]) reduces[field][index] = "";

    reduces[field][index] = serializeObject(
      array,
      reduces[field][index],
      value,
    );

    return reduces;
  }

  if (array.length > 0) {
    reduces[key] = serializeObject(array, reduces[key] || {}, value);
  } else {
    reduces[key] = value;
  }

  return reduces;
};

const serializeData = (data: any) =>
  Object.keys(data || {}).reduce<any>((accumulator, fieldName) => {
    let reduces = accumulator;
    const array = fieldName.split(".");

    reduces = serializeObject(array, reduces, data[fieldName]);

    return reduces;
  }, {});

export const useArrayField = (name: string) => {
  const { values, errors, setItems, addItem, removeItem } =
    useContext(FormContext);

  return {
    items: serializeData(values)[name] || [],
    error: errors[name],
    setItems: (items: any[]) => setItems(name, items),
    addItem: (value: any) => addItem(name, value),
    removeItem: (index: number) => removeItem(name, index),
  };
};

export const useField = (name: string) => {
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useContext(FormContext);

  return {
    error: errors[name],
    value: values[name] || "",
    onChange: handleChange(name),
    onSubmit: handleSubmit,
    getValue: (name1: string) => serializeData(values)[name1],
    setValue: (value: any) => setFieldValue(name, value),
  };
};

type IField = {
  name: string;
  children: ({ value, onChange, error }: any) => JSX.Element;
};

export const Field = ({ name, children }: IField) => {
  const { value, onChange, error } = useField(name);

  return children({ value, onChange, error });
};

export type IFormRef<T> = {
  submit: () => any;
  validate: () => Promise<{ [key: string]: string }>;
  setFormData: (callback: (state: T) => T) => void;
};

const Form = React.forwardRef(
  (
    { initialValues, validationSchema, onSubmit, children }: Props,
    ref: React.Ref<IFormRef<any>>,
  ) => {
    const deserialize = deserializeData(initialValues);
    const [submitted, setSubmitted] = React.useState(false);
    const [values, setFormData] = React.useState(deserializeData(deserialize));
    const [touched, setTouched] = React.useState<{ [key: string]: any }>(
      Object.keys(deserializeData(deserialize)).reduce(
        (accumulator, iterator) => ({
          ...accumulator,
          [iterator]: false,
        }),
        {},
      ),
    );
    const [errors, setErrors] = React.useState({});

    const validate = (
      values: typeof initialValues,
      toucheds: typeof touched,
      callback: (errors: any) => void,
    ) => {
      const data = serializeData(values);
      validationSchema
        .validate(data, { abortEarly: false })
        .then((isValid: boolean) => {
          if (isValid) callback({});
        })
        .catch((err: any) => {
          const errors = err.inner.reduce((errors: any, currentError: any) => {
            if (!toucheds[currentError.path]) return errors;

            return {
              ...errors,
              [currentError.path]: currentError.message,
            };
          }, {});

          callback(errors);
        });
    };

    const handleSubmit = (
      e?: FormEvent<HTMLFormElement>,
    ): Promise<any | null> => {
      e?.preventDefault();
      const data = serializeData(values);
      setSubmitted(true);
      const touched1 = Object.keys(values || {}).reduce(
        (accumulator, iterator) => {
          return {
            ...accumulator,
            [iterator]: true,
          };
        },
        Object.keys(initialValues || {}).reduce(
          (accumulator, iterator) => ({
            ...accumulator,
            [iterator]: true,
          }),
          {},
        ),
      );

      setTouched(touched1);

      return new Promise((resolve) => {
        if (validationSchema) {
          validate(values, touched1, (errors1) => {
            setErrors(errors1);

            if (onSubmit && Object.keys(errors1 || {}).length === 0) {
              onSubmit(data);
            }

            if (Object.keys(errors1 || {}).length === 0) resolve(data);
            else resolve(null);
          });
        } else if (onSubmit) {
          onSubmit(data);
          resolve(data);
        }
      });
    };

    useImperativeHandle(ref, () => ({
      submit() {
        return handleSubmit();
      },
      validate() {
        return new Promise((resolve) => {
          setSubmitted(true);

          const touched1 = Object.keys(values || {}).reduce(
            (accumulator, iterator) => {
              return {
                ...accumulator,
                [iterator]: true,
              };
            },
            Object.keys(initialValues || {}).reduce(
              (accumulator, iterator) => ({
                ...accumulator,
                [iterator]: true,
              }),
              {},
            ),
          );

          setTouched(touched1);
          validate(values, touched1, (errors1) => {
            setErrors(errors1);
            resolve(errors1 || {});
          });
        });
      },
      setFormData: (
        callback: (state: typeof initialValues) => typeof initialValues,
      ) => {
        const data = serializeData(values);
        const result = callback(data);
        result && setFormData(deserializeData(result));
      },
    }));

    const handleChange = (name: string) => (value: any) => {
      const data = { ...values, [name]: value };
      if (touched[name] === true) {
        validate(data, touched, (errors1) => {
          setErrors(errors1);
        });
      }
      setTouched((state) => ({ ...state, [name]: true }));
      setFormData(data);
    };
    const setFieldValue = (name: string, value: any) => {
      setFormData((state: any) =>
        deserializeData({
          ...serializeData(state),
          [name]: value,
        }),
      );
    };

    const addItem = (name: string, value: any) => {
      const data = serializeData(values);
      if (!data[name]) data[name] = [];
      data[name].push(value);
      const deserialize1 = deserializeData(data);
      setFormData(deserialize1);
      if (submitted && validationSchema) {
        const touched1 = Object.keys(deserialize1).reduce(
          (accumulator, iterator) => ({
            ...accumulator,
            [iterator]: true,
          }),
          {},
        );

        setTouched(touched1);

        validate(deserialize1, touched1, (errors1) => {
          setErrors(errors1);
        });
      }
    };

    const removeItem = (name: string, index: number) => {
      const data = serializeData(values);

      data[name] = data[name]?.filter((_i: any, i: number) => i !== index);

      const deserialize1 = deserializeData(data);

      setFormData(deserialize1);

      if (submitted && validationSchema) {
        const touched1 = Object.keys(deserialize1).reduce(
          (accumulator, iterator) => ({
            ...accumulator,
            [iterator]: true,
          }),
          {},
        );

        setTouched(touched1);

        validate(deserialize1, touched1, (errors1) => {
          setErrors(errors1);
        });
      }
    };

    const setItems = (name: string, items: any[]) => {
      const data = serializeData(values);

      data[name] = items;

      const deserialize1 = deserializeData(data);

      setFormData(deserialize1);

      if (submitted && validationSchema) {
        const touched1 = Object.keys(deserialize1).reduce(
          (accumulator, iterator) => ({
            ...accumulator,
            [iterator]: true,
          }),
          {},
        );

        setTouched(touched1);

        validate(deserialize1, touched1, (errors1) => {
          setErrors(errors1);
        });
      }
    };

    const setFormErrors = (errors1: any) => {
      setErrors(errors1);
    };

    return (
      <FormContext.Provider
        value={{
          errors,
          setErrors: setFormErrors,
          values,
          setItems,
          removeItem,
          addItem,
          setFieldValue,
          handleChange,
          handleSubmit,
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          {children({
            values: serializeData(values),
            setItems,
            removeItem,
            addItem,
            errors,
            setErrors: setFormErrors,
            setFieldValue,
            handleChange,
            handleSubmit,
          })}
        </form>
      </FormContext.Provider>
    );
  },
);

export { Form };
