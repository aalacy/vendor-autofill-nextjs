import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import checkoutFormModel from "src/components/job-form/FormModel/checkoutFormModel";
import { SelectField } from "src/components/widgets";
import { useCallback, useMemo } from "react";
import { DatePicker } from "@mui/x-date-pickers";
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
  inputRef,
  handleChange,
  handleBlur,
  editingItemId,
  setEditingItemId,
  item,
  expanded,
  handleExpand,
}) => {
  const secondaryLabel = useCallback(
    (key) => {
      if (checkoutFormModel.formField[key].type === "CheckboxField") {
        if (myJob[key]) return "Yes";
        return "No";
      }
      return myJob[key];
    },
    [myJob, checkoutFormModel],
  );

  return (
    <Accordion expanded={expanded === `${item.name}`} onChange={handleExpand(item.name)}>
      <AccordionSummary aria-controls={`${item.title}-content`} id={`${item.title}-header`}>
        <Typography variant="subtitle1">{item.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List
          sx={{
            width: "100%",
            position: "relative",
          }}
        >
          {item.keys.map((key) => (
            <ListItem
              key={key}
              divider={<Divider variant="middle" />}
              onDoubleClick={() => setEditingItemId(key)}
            >
              {editingItemId === key ? (
                <>
                  {checkoutFormModel.formField[key].type === "SelectField" && (
                    <TextField
                      select
                      ref={inputRef}
                      label={checkoutFormModel.formField[key].label}
                      autoFocus={true}
                      value={myJob[key]}
                      variant="standard"
                      onChange={(e) => handleChange(e.target.value, key)}
                      onBlur={handleBlur}
                      sx={{ minWidth: 120 }}
                    >
                      {checkoutFormModel.formField[key].data.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {checkoutFormModel.formField[key].type === "CheckboxField" && (
                    <FormControl>
                      <FormControlLabel
                        checked={!!myJob[key]}
                        control={
                          <Checkbox
                            ref={inputRef}
                            autoFocus={true}
                            onChange={(e) => handleChange(e.target.value, key)}
                            onBlur={handleBlur}
                          />
                        }
                        label={checkoutFormModel.formField[key].label}
                      />
                    </FormControl>
                  )}
                  {checkoutFormModel.formField[key].type === "DateField" && (
                    <DatePicker
                      ref={inputRef}
                      value={new Date(myJob[key])}
                      onChange={(e) => handleChange(beautyExpiry(e), key)}
                      onAccept={handleBlur}
                      format="yyyy/MM"
                      variant="filled"
                      views={["year", "month"]}
                      minDate={new Date()}
                      slotProps={{
                        textField: {
                          autoFocus: true,
                        },
                      }}
                    />
                  )}
                  {checkoutFormModel.formField[key].type === undefined && (
                    <TextField
                      ref={inputRef}
                      autoFocus={true}
                      label={checkoutFormModel.formField[key].label}
                      variant="standard"
                      value={myJob[key]}
                      onChange={(e) => handleChange(e.target.value, key)}
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
