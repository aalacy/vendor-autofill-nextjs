import { Grid, Button, Box, Typography } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { FieldArray } from "formik";

import {
  InputField,
  DatePickerField,
  AutocompleteField,
} from "src/components/widgets";
import { formatLocalNumber, sum } from "src/utils";

export const MileageMainForm = (props) => {
  const { values, setFieldValue } = props;

  return (
    <>
      <FieldArray
        name="data"
        render={(arrayHelpers) => {
          const data = values?.data;

          return (
            <Box mb={3}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 1 }}>
                <Typography>
                  <b>Total # of miles:</b> {formatLocalNumber(sum(data.map((d) => d.number_of_miles)))}
                </Typography>
                <Typography>
                  <b>Total Mileage Reimbursement($):</b>{" "}
                  {formatLocalNumber(sum(data.map((d) => d.mileage_reimbursement)))}
                </Typography>
              </Box>
              {data?.length > 0
                ? data.map((mileage, index) => (
                    <Box key={index} sx={{ mb: 2, border: 1, borderRadius: 1, p: 1 }}>
                      <Typography fontWeight="medium" gutterBottom>
                        Mileage #{index + 1}
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <DatePickerField
                            name={`data.${index}.date`}
                            label={`Date`}
                            format="MM/dd/yyyy"
                            minDate={new Date()}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <AutocompleteField
                            name={`data.${index}.from_address`}
                            label={`From Address`}
                            fullWidth
                            size="small"
                            setFieldValue={setFieldValue}
                            index={index}
                            values={values}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <AutocompleteField
                            name={`data.${index}.to_address`}
                            label={`To Address`}
                            fullWidth
                            size="small"
                            setFieldValue={setFieldValue}
                            index={index}
                            values={values}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField
                            name={`data.${index}.business_purpose`}
                            label={`Business Purpose`}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField
                            name={`data.${index}.number_of_miles`}
                            label={`# of Miles`}
                            fullWidth
                            size="small"
                            type="number"
                            inputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <InputField
                            name={`data.${index}.mileage_reimbursement`}
                            label={`Mileage Reimbursement $`}
                            fullWidth
                            size="small"
                            type="number"
                            inputProps={{ readOnly: true }}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        startIcon={<RemoveCircleOutline />}
                        color="error"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        Remove
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
                    date: "",
                    from_address: "",
                    to_address: "",
                    business_purpose: "",
                    number_of_miles: 0,
                    mileage_reimbursement: 0,
                  })
                } // insert an empty string at a position
              >
                Add New Mileage
              </Button>
            </Box>
          );
        }}
      />
    </>
  );
};