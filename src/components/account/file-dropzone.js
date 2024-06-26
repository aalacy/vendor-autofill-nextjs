import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  LinearProgress,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  ControlPointDuplicateRounded as DuplicateIcon,
  DeleteOutline as XIcon,
} from "@mui/icons-material";

import { bytesToSize } from "src/utils";

export const FileDropzone = (props) => {
  const {
    accept,
    disabled,
    files,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    preventDropOnDocument,
    children,
    type,
    loading,
    error,
    helperText,
    canUpload,
    name,
    ...other
  } = props;

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
    disabled: !canUpload || disabled,
  });

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
          width: "100%",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} required={false} name={name} />

        {children ? (
          <>{children}</>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ p: 2 }}>
              {loading && <LinearProgress />}
              <Typography variant="h6" textAlign="center">
                {`Select ${type} file${maxFiles && maxFiles === 1 ? "" : "s"}`}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  {`Drop ${type} file${maxFiles && maxFiles === 1 ? "" : "s"}`}{" "}
                  <Link underline="always">browse</Link> thorough your machine
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <FormControl error={error} variant="standard">
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <DuplicateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2",
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton edge="end" onClick={() => onRemove && onRemove(file)}>
                    <XIcon color="error" fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={onRemoveAll} variant="outlined" size="small" type="button">
              Remove All
            </Button>
            <Button
              onClick={onUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

FileDropzone.propTypes = {
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  disabled: PropTypes.bool,
  files: PropTypes.array,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
};

FileDropzone.defaultProps = {
  files: [],
};
