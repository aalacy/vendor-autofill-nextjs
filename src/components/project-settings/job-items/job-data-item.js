import { FormHelperText, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { useCallback, useMemo } from "react";

import checkoutFormModel from "src/components/job-form/FormModel/checkoutFormModel";
import { CheckboxField, DatePickerField, InputField, SelectField } from "src/components/widgets";
import { beautyExpiry } from "src/utils";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export const JobDataItem = ({
  myJob,
  item,
  expanded,
  handleExpand,
  handleBlur,
  editingItemId,
  setEditingItemId,
  formikRef,
}) => {
  const secondaryLabel = useCallback(
    (key) => {
      if (checkoutFormModel.formField[key].type === "CheckboxField") {
        if (myJob[key]) return "Yes";
        return "No";
      }
      if (checkoutFormModel.formField[key].type === "DateField") {
        return beautyExpiry(myJob[key]);
      }
      return myJob[key];
    },
    [myJob, checkoutFormModel],
  );

  const handleItemClick = (key) => {
    setEditingItemId(key);
    formikRef.current.setErrors({});
  };

  const hasError = useMemo(() => {
    return !!formikRef.current?.errors?.CID;
  }, [formikRef.current]);

  return (
    <Accordion expanded={expanded === `${item.name}`} onChange={handleExpand(item.name)}>
      <AccordionSummary aria-controls={`${item.title}-content`} id={`${item.title}-header`}>
        <Typography variant="subtitle1">{item.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormHelperText error={hasError}>{formikRef.current?.errors?.CID || ""}</FormHelperText>
        <List
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          {item.keys.map((key) => (
            <ListItem key={key} divider onDoubleClick={() => handleItemClick(key)}>
              {editingItemId === key ? (
                <>
                  {checkoutFormModel.formField[key].type === "SelectField" && (
                    <SelectField
                      name={key}
                      label={checkoutFormModel.formField[key].label}
                      data={checkoutFormModel.formField[key].data}
                      onBlur={handleBlur}
                      size="small"
                      fullWidth
                    />
                  )}
                  {checkoutFormModel.formField[key].type === "CheckboxField" && (
                    <CheckboxField
                      name={key}
                      label={checkoutFormModel.formField[key].label}
                      onBlur={handleBlur}
                    />
                  )}
                  {checkoutFormModel.formField[key].type === "DateField" && (
                    <DatePickerField
                      name={key}
                      label={checkoutFormModel.formField[key].label}
                      onAccept={handleBlur}
                      minDate={new Date()}
                      format={checkoutFormModel.formField[key].format}
                      views={["year", "month"]}
                    />
                  )}
                  {checkoutFormModel.formField[key].type === undefined && (
                    <InputField
                      name={key}
                      label={checkoutFormModel.formField[key].label}
                      fullWidth
                      autoFocus
                      onBlur={handleBlur}
                    />
                  )}
                </>
              ) : (
                <ListItemText
                  primary={checkoutFormModel.formField[key].label}
                  secondary={secondaryLabel(key)}
                />
              )}
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
