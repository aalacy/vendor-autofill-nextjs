import toast from "react-hot-toast";
import { useCallback, useState } from "react";
import { Avatar, Box, CircularProgress, IconButton, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AccountCircle as UserCircleIcon, Edit as PencilIcon } from "@mui/icons-material";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../common/modal";
import { UserService } from "src/services";
import { FileDropzone } from "./file-dropzone";
import { formatPhoneNumber } from "src/utils";
import { AccountPerson } from "./form-fields/account-person";

const HoverBox = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%", // or set to desired width
  height: "100%", // or set to desired height
  // More styles as per your requirement
  "&:hover": {
    cursor: "pointer",
  },
  "&:hover .update-btn": {
    // This selects the child with the class update-btn on hover
    opacity: 1, // Show the button
    transition: "opacity 0.3s", // Smooth transition for opacity change
  },
  "& .update-btn": {
    opacity: 0, // The button is invisible at first
    position: "absolute", // Position it over the Box
    top: "50%", // Align vertically
    left: "50%", // Align horizontally
    transform: "translate(-50%, -50%)", // Center the button
  },
}));

export const AvatarUpload = () => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);

  const onClose = () => setOpen(false);

  const uploadedFile = (event) => {};

  const handleDrop = (newFiles, fileRejections) => {
    setFiles(() => [...newFiles]);
    if (fileRejections.length) {
      const { errors } = fileRejections[0];
      let message = errors[0].message;
      if (errors[0].code === ErrorCode.TooManyFiles) {
        message = `Cannot upload more than ${maxFileLimit} file(s)`;
      }
      toast.error(message);
    }
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    onClose();
    try {
      const { data } = await UserService.uploadAvatar(files[0], uploadedFile);
      setOpen(false);
      toast.success("Successfully uploaded.");
      setUser({ ...user, avatar: data.result });
    } catch (err) {
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateContact = useCallback(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", position: "relative", gap: 4, mb: 4 }}>
        <IconButton onClick={() => setOpen(true)}>
          {loading ? (
            <CircularProgress size={85} />
          ) : (
            <Avatar
              src={user?.avatar || "/assets/avatars/no-profile1.png"}
              sx={{
                height: 85,
                width: 85,
                outline: "1px solid lightgray",
              }}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          )}
          <PencilIcon color="primary" sx={{ position: "absolute", top: 13, right: 5 }} />
        </IconButton>
        <HoverBox>
          <Typography variant="h6" textTransform="capitalize">
            {user?.person?.first_name} {user?.person?.last_name}
          </Typography>
          <Typography variant="body2" textTransform="capitalize">
            {user?.person?.title}
          </Typography>
          <Typography fontStyle="italic" variant="caption">
            {formatPhoneNumber(user?.person?.phone_number)}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            className="update-btn"
            startIcon={<PencilIcon color="primary" />}
            onClick={onUpdateContact}
          >
            Update
          </Button>
        </HoverBox>
      </Box>
      {open && (
        <Modal open={true} onClose={onClose} title="Upload Avatar" size="sm">
          <FileDropzone
            maxFiles={1}
            accept={{ "image/jpeg": [".jpeg", ".png"] }}
            files={files}
            onDrop={handleDrop}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
            onUpload={onUpload}
            type="Image"
          />
        </Modal>
      )}
      {show && <AccountPerson show={true} setShow={setShow} />}
    </>
  );
};
