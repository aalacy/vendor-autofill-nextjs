import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { useState } from "react";

import { useAuth } from "src/hooks/use-auth";
import { useMounted } from "src/hooks/use-mounted";
import { UserService } from "src/services";
import { AccountEmail } from "./form-fields/account-email";
import { AccountPassword } from "./form-fields/account-password";

export const AccountForm = () => {
  const { user, showConfirmDlg, hideConfirm, setUser } = useAuth();
  const isMounted = useMounted();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (values, helpers) => {
    hideConfirm();

    const { submit, confirmPassword, ...other } = values;
    try {
      const { data } = await UserService.updateUser(user.id, other);
      localStorage.setItem("auth_token", data.result.access_token);
      setUser(data.result.user);
      toast.success(data.detail);
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err?.response?.data?.message || err.message,
        });
        helpers.setSubmitting(false);
      }
    }
  };

  const onSubmit = async (values, helpers) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: () => handleSubmit(values, helpers),
    });
  };

  return (
    <>
      <Box maxWidth="sm">
        <AccountEmail onSubmit={onSubmit} />
        <AccountPassword onSubmit={onSubmit} />
        {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography fontWeight="bold" color="GrayText">More Fields</Typography>
          <IconButton onClick={handleCollapseClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box> */}
        {/* <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
          <AccountFirstName onSubmit={onSubmitPerson} />
          <AccountLastName onSubmit={onSubmitPerson} />
          <AccountTitle onSubmit={onSubmitPerson} />
          <AccountPhone onSubmit={onSubmitPerson} />
        </Collapse> */}
      </Box>
    </>
  );
};
