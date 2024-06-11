import at from "lodash/at";
import { useField } from "formik";
import { TextField } from "@mui/material";

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
      inputProps = {{
        autoComplete: "off"
      }}
      {...field}
      {...rest}
    />
  );
};
