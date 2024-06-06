import toast from "react-hot-toast";
import { ErrorCode } from "react-dropzone";

import { FileDropzone } from "src/components/account/file-dropzone";

export const FileInput = (props) => {
  const {
    maxFileLimit,
    onUpload,
    loading,
    files,
    setFiles,
    canUpload,
    children,
    name,
    disabled,
    helperText,
    error,
  } = props;

  const onDrop = (newFiles, fileRejections) => {
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

  return (
    <>
      <FileDropzone
        maxFiles={maxFileLimit || 10}
        accept={{ "application/pdf": [".pdf"] }}
        files={files}
        onDrop={onDrop}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        onUpload={onUpload}
        type="PDF"
        loading={loading}
        error={error}
        helperText={helperText}
        canUpload={canUpload}
        name={name}
        disabled={disabled}
      >
        {children}
      </FileDropzone>
    </>
  );
};
