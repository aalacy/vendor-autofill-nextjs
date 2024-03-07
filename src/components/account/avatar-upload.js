import toast from "react-hot-toast";
import { useState } from "react";
import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
import { AccountCircle as UserCircleIcon, Edit as PencilIcon } from "@mui/icons-material";

import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../common/modal";
import { UserService } from "src/services";
import { FileDropzone } from "./file-dropzone";

export const AvatarUpload = () => {
  const { user, setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const onClose = () => setOpen(false);

  const uploadedFile = (event) => {};

  const handleDrop = (newFiles, fileRejections) => {
    setFiles(() => [...newFiles]);
    if (fileRejections.length) {
      const { file } = fileRejections[0];
      const { name } = file;
      let message = `The file ${name} is not CSV format.`;
      toast.error(message);
    }
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path),
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const onUpload = async () => {
    if (!files || files?.length < 1) return;
    setFiles([]);
    setLoading(true);
    onClose()
    try {
      const { data } = await UserService.uploadAvatar(files[0], uploadedFile);
      toast.success("Successfully uploaded.");
      setUser({...user, avatar: data.result});
    } catch (err) {
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      toast.error(submit);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "inline-block", position: "relative" }}>
        <IconButton onClick={() => setOpen(true)}>
          {loading ? (
            <CircularProgress size={85} />
          ) : (
            <Avatar
              src={
                user?.avatar ||
                '/assets/avatars/avatar-anika-visser.png'
              }
              sx={{
                height: 85,
                width: 85,
                mb: 4,
                border: '0.1px solid lightgray'
              }}
            >
              <UserCircleIcon fontSize="small" />
            </Avatar>
          )}
        </IconButton>
        <PencilIcon
          color="primary"
          sx={{ position: "absolute", top: 13, right: 5 }}
        />
      </Box>
      <Modal open={open} onClose={onClose} title="Upload Avatar" size="sm">
        <FileDropzone
          maxFiles={1}
          accept="image/*"
          files={files}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={onUpload}
          type="Image"
        />
      </Modal>
    </>
  );
};
