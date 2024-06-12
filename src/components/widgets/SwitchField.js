import React from "react";
import at from "lodash/at";
import { useField } from "formik";
import { Switch, FormControl, FormControlLabel, FormHelperText } from "@mui/material";

export const SwitchField = (props) => {
  const { label, ...rest } = props;
  const [field, meta, helper] = useField(props);
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
    <FormControl {...rest} sx={{ border: 1, borderRadius: 1, p: 1 }} fullWidth>
      <FormControlLabel
        control={<Switch {...field} checked={field.checked} onChange={_onChange} />}
        label={label}
      />
      {_renderHelperText()}
    </FormControl>
  );
};
