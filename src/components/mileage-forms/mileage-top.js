import { Grid } from "@mui/material";
import { useEffect } from "react";

import { DatePickerField, InputField } from "src/components/widgets";
import { thisSunday } from "src/utils";

const Weeks = [
  {
    value: "Mon",
    label: "Mon",
  },
  {
    value: "Tue",
    label: "Tue",
  },
  {
    value: "Wed",
    label: "",
  },
  {
    value: "Thu",
    label: "Thu",
  },
  {
    value: "Fri",
    label: "Fri",
  },
  {
    value: "Sat",
    label: "Sat",
  },
  {
    value: "Sun",
    label: "Sun",
  },
];

export const MileageTop = ({ values, setFieldValue }) => {
  useEffect(() => {
    setFieldValue("week_of", values.week_of || thisSunday());
  }, []);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6}>
          <InputField name="name" label="Name" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name="week_of"
            maxDate={new Date()}
            label="Week Of"
            format="MM/dd/yyyy"
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
};
