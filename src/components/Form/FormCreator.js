import { Button, CircularProgress, Grid } from "@mui/material";
import React from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Inputs from "./Inputs";

const FormCreator = ({
  open,
  title,
  onSubmit,
  onCancel,

  data,
  mode,

  formData,
  size,
  optionsData,
  watchFields = [],
  onWatchChange = () => { },
  onWatchArray = () => { },
}) => {
  const methods = useForm({
    defaultValues: { ...data },
  });
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    setValue,
    getValues,
  } = methods;
  const watching = watch(watchFields);
  const isLoading = useSelector((state) => state.util.spinner);
  const [formErrors, setFormErrors] = React.useState({});
  const [fileFields, setFileFields] = React.useState();
  const [otherFields, setOtherFields] = React.useState({});

  const handleOtherChange = ({ name, value }) => {
    setOtherFields({
      ...otherFields,
      [name]: value,
    });
  };
  const handleFileFieldChange = (name, file) => {
    console.log("upcomin", file);
    setFileFields({
      [name]: file,
    });
  };
  const localSubmit = (values) => {
    onSubmit({ ...data, ...values, ...fileFields, ...otherFields });
  };

  const handleClose = () => {
    reset();
    onCancel && onCancel();
  };

  React.useEffect(() => {
    if (data) {
      const arrayFields = formData?.find((d) => d.type === "fieldarray");
      if (arrayFields && data[arrayFields?.name]) {
        setValue(arrayFields?.name, data[arrayFields?.name]);
      }
      Object.keys(data).forEach((d) => {
        setValue(d, data[d]);
      });
    }
    if (formData) {
      formData.forEach((d) => {
        if (d.type === "switch") {
          if (data[d] === undefined || data[d] === null)
            setValue(d.name, Boolean(data[d]));
        }
      });
    }
  }, [data, formData]);

  React.useEffect(() => {
    onWatchChange(watching);
  }, [watching]);

  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);

  // console.log("formState", formState);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(localSubmit)}>
        <Grid container spacing={2}>
          {formData &&
            formData.map((item, index) => {
              const MyInput = Inputs[item.type];

              return (
                mode !== item?.hideAt &&
                !item.hidden && (
                  <MyInput
                    {...item}
                    key={index}
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    // defaultValue={data ? data[item.name] : ""}
                    defaultData={data ? data[item.name] : ""}
                    // ref={register({
                    //   ...item.rules,
                    //   ...(item.required && {
                    //     required: true,
                    //   }),
                    // })}
                    error={formErrors[item.name]?.message}
                    mode={mode}
                    setValue={setValue}
                    onCustomChange={handleOtherChange}
                    onFileChange={handleFileFieldChange}
                    control={control}
                    // register={register}
                    {...(item?.hasOptions && {
                      options: optionsData[item.name],
                    })}
                    onWatchArray={(e) => onWatchArray({ [item.name]: e })}
                    rules={{
                      ...item.rules,
                      ...(item.required && {
                        required: {
                          value: true,
                          message: `${item.label} is required`,
                        },
                      }),
                    }}
                  />
                )
              );
            })}

          <Grid item lg={12} md={12} sm={12}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              disabled={isLoading}
              sx={{ mr: 1 }}
            >
              {isLoading && <CircularProgress color="secondary" />}
              Submit
            </Button>
            {onCancel && (
              <Button
                variant="text"
                color="secondary"
                disabled={isLoading}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FormCreator;
