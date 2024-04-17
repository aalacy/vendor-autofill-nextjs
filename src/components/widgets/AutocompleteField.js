import { at } from "lodash";
import { useField } from "formik";
import { Autocomplete, TextField, Grid, Typography, Box } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geocodeByPlaceID } from "./geocoder";

import { calculateDistance } from "src/utils";

const loadScript = (src, position, id) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

const autocompleteService = { current: null };

export const AutocompleteField = (props) => {
  const { errorText, setFieldValue, name, index, values, ...rest } = props;
  const [field, meta] = useField(props);

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState(values.data[index][name.split('.').at(-1)] || "");
  const loaded = useRef(false);
  const inputRef = useRef(null);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}&libraries=places,geometry&loading=async`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  const calculateMiles = useCallback(async () => {
    const fromAddress = await geocodeByPlaceID(values.data[index].from_address_place_id);
    const toAddress = await geocodeByPlaceID(values.data[index].to_address_place_id);
    const distance = calculateDistance(fromAddress[0].geometry.location, toAddress[0].geometry.location)
    setFieldValue(`data.${index}.number_of_miles`, distance);
    setFieldValue(`data.${index}.mileage_reimbursement`, distance * .67);
}, [value, values]);

    const manageDefaultValue = () => {
    if (!values?.data || values.data.length < 2) return;
    if (!name.includes("from_address")) return;

  // "From" address of new milage entry autofills with the "To" address of the previous entry
    const curFrom = values.data.at(-1).from_address;
    const curFromPlaceId = values.data.at(-1).from_address_place_id;
        const prevTo = values.data.at(-2).to_address;
    const prevToPlaceId = values.data.at(-2).to_address_place_id;
    setFieldValue(`data.${index}.from_address`, curFrom || prevTo);
    setFieldValue(`data.${index}.from_address_place_id`, curFromPlaceId || prevToPlaceId);
          setDefaultValue(curFrom || prevTo);
      
    console.log('curFrom || prevTo', name, curFrom || prevTo)
  }

  useEffect(() => {
    if (!values?.data || values.data.length === 0) return;
        if (!values.data[index].from_address || !values.data[index].to_address) return;
    if (!window.google?.maps?.Geocoder) return;
    
    calculateMiles();
  }, [values?.data])

  useEffect(() => {
    manageDefaultValue();
  }, [])

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google?.maps?.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService(inputRef.current);
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        // if (value) {
          //   newOptions = [value];
        // }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    if (value) {
      const { place_id, description } = value;
      setFieldValue(`${name}_place_id`, place_id);
      setFieldValue(`${name}`, description);
    }

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);


  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    } else return "";
  }

  return (
    <Autocomplete
      autoComplete
      getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      filterSelectedOptions
      noOptionsText="No locations"
      defaultValue={defaultValue}
      // isOptionEqualToValue={(option, value) => option.id === value.id}
      // value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...rest}
          ref={inputRef}
          error={meta.touched && meta.error && true}
          helperText={_renderHelperText()}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      sx={{
        touchAction: "manipulation",
      }}
    />
  );
};
