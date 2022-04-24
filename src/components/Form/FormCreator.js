import { Button, CircularProgress, Grid, Stack } from "@mui/material";
import React, { useImperativeHandle } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFieldArray,
} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useLanguages from "../../hooks/useLanguage";
import * as Inputs from "./Inputs";

const FormCreator = React.forwardRef(
  (
    {
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
      onWatchChange = () => {},
      onWatchArray = () => {},
      onDelete,
      submitText,
      hideButtons = false,
    },
    ref
  ) => {
    const methods = useForm({
      defaultValues: { ...data },
    });
    const localSubmit = (values) => {
      onSubmit({ ...data, ...values, ...fileFields, ...otherFields });
    };
    const {
      register,
      watch,
      errors,
      control,
      formState,
      reset,
      setValue,
      getValues,
    } = methods;
    const handleSubmit = methods.handleSubmit(localSubmit);
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
    const translate = useLanguages();

    useImperativeHandle(ref, () => ({
      submit() {
        handleSubmit();
      },
    }));

    // console.log("formState", formState);

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
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

            {!hideButtons && (
              <Grid item lg={12} md={12} sm={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={isLoading}
                      sx={{ mr: 1 }}
                    >
                      {isLoading && <CircularProgress color="secondary" />}
                      {translate("SUBMIT")}
                    </Button>
                    {onCancel && (
                      <Button
                        variant="text"
                        color="error"
                        disabled={isLoading}
                        onClick={() => handleClose()}
                      >
                        {translate("CANCEL")}
                      </Button>
                    )}
                  </div>
                  {onDelete && (
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={isLoading}
                      onClick={() => onDelete()}
                    >
                      {translate("DELETE")}
                    </Button>
                  )}
                </Stack>
              </Grid>
            )}
          </Grid>
        </form>
      </FormProvider>
    );
  }
);

export default FormCreator;
