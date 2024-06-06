import {
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

export const MyRadioGroup = ({
  name,
  groupLabel,
  error,
  value,
  helperText,
  handleChange,
  items,
  noLabel,
}) => {
  return (
    <FormControl
      fullWidth
      sx={{ flexDirection: "row", alignItems: "flex-end", gridColumn: "span 2" }}
      error={error}
      variant="standard"
    >
      <FormLabel id={`myRadios-${name}`}
sx={{ mr: 3, mb: 1 }}>
        {groupLabel}
      </FormLabel>
      <RadioGroup
        aria-labelledby={`myRadios-${name}`}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <Stack spacing={3}
direction="row">
          {items.map((item) => (
            <FormControlLabel
              labelPlacement="top"
              key={item}
              value={item}
              control={<Radio />}
              label={noLabel ? "" : item}
            />
          ))}
        </Stack>
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
