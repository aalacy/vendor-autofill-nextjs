import React from "react";
import at from "lodash/at";
import { useField } from "formik";
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";

export const CheckboxField = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
  const { value: selectedValue } = field;
  const { setValue } = helper;

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  function _onChange(e) {
    setValue(e.target.checked);
  }

  return (
    <FormControl {...rest} error={meta.touched && meta.error && true}>
      <FormControlLabel
        checked={selectedValue}
        control={<Checkbox {...field} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
};
