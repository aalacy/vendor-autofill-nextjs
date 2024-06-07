import { Grid, Button, Box, Typography } from "@mui/material";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { FieldArray } from "formik";

import { InputField } from "src/components/widgets";

export const Step5 = (props) => {
  const { values } = props;

  return (
    <>
      <FieldArray
        name="buyers"
        render={(arrayHelpers) => {
          const buyers = values?.buyers;
          return (
            <Box>
              {buyers?.length > 0
                ? buyers.map((user, index) => (
                    <Box key={index}
sx={{ mb: 2, border: 1, borderRadius: 1, p: 1 }}>
                      <Typography fontWeight="medium"
gutterBottom>
                        Buyer #{index + 1}
                      </Typography>
                      <Grid container
spacing={3}>
                        <Grid item
xs={12}
sm={6}>
                          <InputField name={`buyers.${index}.name`}
label={`Name`}
fullWidth />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
                          <InputField name={`buyers.${index}.title`}
label={`Title`}
fullWidth />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
                          <InputField name={`buyers.${index}.phone`}
label={`Phone`}
fullWidth />
                        </Grid>
                        <Grid item
xs={12}
sm={6}>
                          <InputField name={`buyers.${index}.email`}
label={`Email`}
fullWidth />
                        </Grid>
                      </Grid>
                      <Button
                        startIcon={<RemoveCircleOutline />}
                        color="error"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        Remove a Buyer
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
                    email: "",
                    phone: "",
                  })
                } // insert an empty string at a position
              >
                add a Buyer
              </Button>
            </Box>
          );
        }}
      />
    </>
  );
};
