import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { forwardRef } from "react";

export const NumericFormatCustom = forwardRef(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        console.log("props", props);
        onChange({
          target: {
            name: props.name,
            value: values.floatValue.toFixed(2) + "-----",
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    />
  );
});

export const InputField = (props) => {
  const { errorText, value, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      {...field}
      {...rest}
    />
  );
};
