import { useState } from "react";
import { Typography } from "@mui/material";
import { useCSVReader, lightenDarkenColor, formatFileSize } from "react-papaparse";

import { Modal } from "../modal";
import { ClientDataGrid } from "../client-datagrid";
import { JobInfoColumns } from "src/columns";
import { csvUploadStyles } from "src/utils/constants";
import { refineCSVData } from "src/utils";

const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(DEFAULT_REMOVE_HOVER_COLOR, 40);

export const JobInfo = ({ open, setOpen, data, setData }) => {
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(DEFAULT_REMOVE_HOVER_COLOR);

  const onClose = () => setOpen(false);

  const { CSVReader } = useCSVReader();

  return (
    <>
      <Modal open={open} onClose={onClose} title="Upload Job Info" size="sm">
        <CSVReader
          config={{ header: true }}
          onUploadAccepted={(results) => {
            setData(refineCSVData(results.data));
            setZoneHover(false);
            onClose();
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setZoneHover(false);
          }}
          noDrag
        >
          {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps, Remove }) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  csvUploadStyles.zone,
                  zoneHover && csvUploadStyles.zoneHover
                )}
              >
                {acceptedFile ? (
                  <>
                    <div style={csvUploadStyles.file}>
                      <div style={csvUploadStyles.info}>
                        <span style={csvUploadStyles.size}>
                          {formatFileSize(acceptedFile.size)}
                        </span>
                        <span style={csvUploadStyles.name}>{acceptedFile.name}</span>
                      </div>
                      <div style={csvUploadStyles.progressBar}>
                        <ProgressBar />
                      </div>
                      <div
                        {...getRemoveFileProps()}
                        style={csvUploadStyles.remove}
                        onMouseOver={(event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
                      </div>
                    </div>
                  </>
                ) : (
                  "Click to upload"
                )}
              </div>
            </>
          )}
        </CSVReader>
      </Modal>

      <Typography variant="h6" mb={2}>
        Jon Info
      </Typography>

      <ClientDataGrid data={data} columns={JobInfoColumns(data?.length > 0 ? data[0] : {})} />
    </>
  );
};
