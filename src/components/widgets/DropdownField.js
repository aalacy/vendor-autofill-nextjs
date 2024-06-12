import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import at from "lodash/at";
import * as Yup from "yup";
import { useField, Formik, Form } from "formik";
import { styled, alpha } from "@mui/material/styles";
import {
  FormControl,
  MenuItem,
  FormHelperText,
  Button,
  Menu,
  Typography,
  Stack,
  IconButton,
  ListItemText,
  ListItemIcon,
  MenuList,
  Divider,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AddCircleOutline, BusinessCenterOutlined, DeleteOutline } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import LoadingOverlay from "../common/loading-overlay";
import { VendorService } from "src/services";
import { InputField } from "./InputField";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    maxHeight: 300,
    color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

const AddPurposeForm = ({ setGLoading, handleCloseShow }) => {
  const queryClient = useQueryClient();

  const submitForm = useCallback(async (values) => {
    try {
      setGLoading(true);
      await VendorService.addBusinessPurpose(values.purpose);
      handleCloseShow();
      queryClient.invalidateQueries({ queryKey: ["getBusinessPurposes"] });
      toast.success("Successfully added new purpose");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setGLoading(false);
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{ purpose: "" }}
        validationSchema={Yup.object().shape({
          purpose: Yup.string().required(`required`),
        })}
        onSubmit={submitForm}
        enableReinitialize
      >
        {() => (
          <Form>
            <Stack spacing={2} p={2}>
              <InputField
                type="text"
                fullWidth
                autoFocus
                hiddenLabel
                name="purpose"
                size="small"
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
              />
              <Stack direction="row" spacing={2}>
                <Button size="small" variant="contained" type="submit">
                  Save
                </Button>
                <Button size="small" onClick={handleCloseShow}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const DropdownField = (props) => {
  const { label, data, multiple, setFieldValue, itemValue, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue, name } = field;
  const [touched, error] = at(meta, "touched", "error");

  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState(null);
  const [show, setShow] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item) => {
    handleClose();
    setFieldValue(name, item);
  };

  console.log('itemValue', itemValue)

  useEffect(() => {
    if (!selectedValue) setFieldValue(name, itemValue || "Business");
  }, [selectedValue]);

  const isError = touched && error && true;

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  const handleCloseShow = () => setShow(false);

  const handleAdd = () => {
    setShow(true);
  };

  const handleDeletePurpose = useCallback(async (purpose) => {
    try {
      setGLoading(true);
      await VendorService.removeBusinessPurpose(purpose);
      queryClient.invalidateQueries({ queryKey: ["getBusinessPurposes"] });
      handleCloseShow();
      toast.success("Successfully deleted");
      setFieldValue(name, "Business");
    } catch (error) {
      toast.error(error.response?.data || error.message);
    } finally {
      setGLoading(false);
    }
  }, []);

  return (
    <>
      <FormControl error={isError}>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          {...rest}
        >
          {selectedValue}
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuList>
            {data.map(({ value, icon, isDefault }) => (
              <MenuItem
                key={value}
                selected={value === selectedValue}
                value={value}
                onClick={() => handleSelect(value)}
              >
                <ListItemIcon>{icon || <BusinessCenterOutlined />} </ListItemIcon>
                <ListItemText>{value}</ListItemText>
                {!isDefault ? (
                  <Tooltip title="Delete purpose">
                    <IconButton size="small" onClick={() => handleDeletePurpose(value)}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </MenuItem>
            ))}
            <Divider variant="middle" />
            {!show ? (
              <>
                <MenuItem onClick={handleAdd}>
                  <AddCircleOutline color="primary" />{" "}
                  <Typography color="ButtonHighlight">Add purpose</Typography>
                </MenuItem>
              </>
            ) : (
              <AddPurposeForm setGLoading={setGLoading} handleCloseShow={handleCloseShow} />
            )}
          </MenuList>
        </StyledMenu>
        {_renderHelperText()}
      </FormControl>
      <LoadingOverlay setOpen={setGLoading} open={gLoading} />
    </>
  );
};

DropdownField.defaultProps = {
  data: [],
};

DropdownField.propTypes = {
  data: PropTypes.array.isRequired,
};
