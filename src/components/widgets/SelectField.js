import React from "react";
import PropTypes from "prop-types";
import at from "lodash/at";
import { useField } from "formik";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";

export const SelectField = (props) => {
  const { label, data, multiple, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");

  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <TextField
      select
      label={label}
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      multiple={multiple}
      value={selectedValue ? selectedValue : ""}
      {...field}
      {...rest}
    >
      {data.map((item, index) => (
        <MenuItem key={index}
value={item.value || item.role_name}>
          {item.label || item.role_name}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};
