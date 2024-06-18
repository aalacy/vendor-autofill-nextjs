import { Grid, Box } from "@mui/material";

import { InputField, DatePickerField } from "src/components/widgets";

export const MileageBottom = () => {
  return (
    <Box sx={{ mb: 2, border: 1, borderRadius: 1, p: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name="employee_signature" label="Employee Signature" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name="employee_signature_date"
            label={`Date`}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name="approval_signature" label="Approval Signature" fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerField
            name="approval_signature_date"
            label={`Date`}
            minDate={new Date()}
            fullWidth
          />
        </Grid>
      </Grid> */}
    </Box>
  );
};
