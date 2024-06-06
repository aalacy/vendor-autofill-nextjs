import { Grid, Button, Box, Typography } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { FieldArray } from "formik";
import { useEffect } from "react";

import { InputField, DatePickerField, AutocompleteField } from "src/components/widgets";

const BusinessOptions = [
  {
    value: "Fedex",
    label: "Fedex",
  },
  {
    value: "UPS",
    label: "UPS",
  },
];

export const MileageMainForm = (props) => {
  const { values, setFieldValue, setEmpty } = props;

  const manageDateDefaultValue = () => {
    const prevDate = values.data.at(-2).date;
    const curDate = values.data.at(-1).date;
    const index = values.data.length - 1;
    setFieldValue(`data.${index}.date`, curDate || prevDate);
  };

  const checkFormEmpty = () => {
    const { data, ...others } = values;
    // check if the values is empty object
    if (Object.values(others).some((v) => v)) {
      setEmpty(false);
    } else {
      for (const item of data) {
        if (Object.values(item).some((v) => v)) {
          setEmpty(false);
          break;
        }
      }
    }
  };

  useEffect(() => {
    checkFormEmpty();

    // populate week_of date into first date of the mileage form
    let date = values.week_of;
    if (values?.data?.length > 0) {
      date = values.data[0].date || date;
    }
    setFieldValue(`data.0.date`, date);

    if (!values?.data || values.data.length < 2) return;
    // select date in the present and past vs date in the present and future.

    manageDateDefaultValue();
  }, [values]);

  return (
    <>
      <FieldArray
        name="data"
        render={(arrayHelpers) => {
          const data = values?.data;

          return (
            <Box mb={3}>
              {data?.length > 0
                ? data.map((mileage, index) => (
                    <Box key={index}
sx={{ mb: 2, border: 1, borderRadius: 1, p: 1 }}>
                      <Typography fontWeight="medium"
gutterBottom>
                        Mileage #{index + 1}
                      </Typography>
                      <Grid container
spacing={3}>
                        <Grid item
xs={12}
sm={6}>
                          <DatePickerField
                            name={`data.${index}.date`}
                            label={`Date`}
                            format="MM/dd/yyyy"
                            maxDate={new Date()}
                            fullWidth
                          />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
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
                        <Grid item
xs={12}
sm={6}>
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
                        <Grid item
xs={12}
sm={6}>
                          <InputField
                            name={`data.${index}.business_purpose`}
                            label={`Business Purpose`}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
                          <InputField
                            name={`data.${index}.number_of_miles`}
                            label={`# of Miles`}
                            fullWidth
                            size="small"
                            inputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
                          <InputField
                            name={`data.${index}.mileage_reimbursement`}
                            label={`Mileage Reimbursement $`}
                            fullWidth
                            size="small"
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
