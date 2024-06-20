import { Box } from "@mui/material";
import toast from "react-hot-toast";

import { useAuth } from "src/hooks/use-auth";
import { useMounted } from "src/hooks/use-mounted";
import { UserService } from "src/services";
import { AccountEmail } from "./form-fields/account-email";
import { AccountPassword } from "./form-fields/account-password";

export const AccountForm = () => {
  const { user, showConfirmDlg, hideConfirm, setUser } = useAuth();
  const isMounted = useMounted();

  const handleSubmit = async (values, helpers) => {
    hideConfirm();

    const { submit, confirmPassword, ...other } = values;
    try {
      const { data } = await UserService.updateUser(user.id, other);
      localStorage.setItem("auth_token", data.result.access_token);
      setUser(data.result.user);
      toast.success(data.detail);
    } catch (err) {
      toast.error(err?.response?.data || err.message);
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
      <Box sx={{ minWidth: 300 }}>
        <AccountEmail onSubmit={onSubmit} />
        <AccountPassword onSubmit={onSubmit} />
      </Box>
    </>
  );
};
