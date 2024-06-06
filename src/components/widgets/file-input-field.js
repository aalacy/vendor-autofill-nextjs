import toast from "react-hot-toast";
import { at } from "lodash";
import { ErrorCode } from "react-dropzone";
import { useField } from "formik";

import { FileInput } from "./file-input";

export const FileInputField = (props) => {
  const { maxFileLimit, onUpload, loading, files, setFiles, canUpload, children, name, disabled } =
    props;
  const [, meta] = useField(props);

  function _renderHelperText() {
    const [, error] = at(meta, "touched", "error");
    if (!canUpload) {
      return "Please input the vendor name";
    }
    if (error) {
      return error;
    }
  }

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
    <FileInput
        maxFiles={maxFileLimit || 10}
        accept={{ "application/pdf": [".pdf"] }}
        files={files}
        onDrop={onDrop}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        onUpload={onUpload}
        type="PDF"
        loading={loading}
        error={!!meta.error || !canUpload}
        helperText={_renderHelperText()}
        canUpload={canUpload}
        name={name}
        disabled={disabled}
      >
        {children}
      </FileInput>

    </>
  );
};
