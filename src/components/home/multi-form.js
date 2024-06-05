import { Grid, Button, Box, Typography } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { FieldArray } from "formik";

import { InputField } from "src/components/widgets";
import { MultiVendorFileInput } from "./multi-vendor-file-input";

export const VendorMultiForm = (props) => {
  const { values, setFieldValue } = props;

  return (
    <>
      <FieldArray
        name="forms"
        render={(arrayHelpers) => {
          const forms = values?.forms;
          return (
            <Box sx={{ gridColumn: "span 4" }}>
              {forms?.length > 0
                ? forms.map((form, index) => (
                    <Box key={index} sx={{ mb: 2, border: 1, borderRadius: 1, p: 1 }}>
                      <Typography fontWeight="medium" gutterBottom>
                        Form #{index + 1}
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <InputField name={`forms.${index}.name`} label={`Name*`} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField name={`forms.${index}.title`} label={`Title*`} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                          <MultiVendorFileInput
                            values={values}
                            setFieldValue={setFieldValue}
                            name={`forms.${index}.template_key`}
                            value={form.template_key}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        startIcon={<RemoveCircleOutline />}
                        color="error"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        Remove a Form
                      </Button>
                    </Box>
                  ))
                : null}
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddCircleOutline />}
                onClick={() =>
                  arrayHelpers.push({
                    name: "",
                    title: "",
                    template_key: ""
                  })
                } // insert an empty string at a position
              >
                add a Form
              </Button>
            </Box>
          );
        }}
      />
    </>
  );
};
