import { Box, List, IconButton } from "@mui/material";
import { MoreHoriz as MoreVertIcon } from "@mui/icons-material";
import { useState } from "react";

import { FileCard } from "./file-card";
import { CardSkeleton } from "../skeleton/card-skeleton";
import { FileItem } from "./file-item";
import { FolderDetail } from "./folder-detail";
import CustomNoRowsOverlay from "../tables/custom-no-rows";

export const FileList = ({ downloadFiles, loading, folders, alignment, removeItem }) => {
  const [curFolder, setFolder] = useState();
  const [open, setOpen] = useState(false);

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <>
          {!folders || folders?.length === 0 ? (
            <Box sx={{ my: 5 }}>
              <CustomNoRowsOverlay />
            </Box>
          ) : null}

          {alignment === "card" ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-start",
                my: 5,
              }}
            >
              {folders?.map((folder) => (
                <FileCard
                  key={folder.folder_name}
                  setFolder={setFolder}
                  folder={folder}
                  removeItem={removeItem}
                  setOpen={setOpen}
                  downloadFiles={downloadFiles}
                />
              ))}
            </Box>
          ) : (
            <List
              sx={{ width: 1 }}
              secondaryAction={
                <IconButton edge="end" aria-label="more">
                  <MoreVertIcon />
                </IconButton>
              }
            >
              {folders?.map((folder) => (
                <FileItem
                  key={folder.name}
                  setFolder={setFolder}
                  folder={folder}
                  removeItem={removeItem}
                  setOpen={setOpen}
                  downloadFiles={downloadFiles}
                />
              ))}
            </List>
          )}
        </>
      )}

      <FolderDetail removeItem={removeItem} open={open} setOpen={setOpen} folder={curFolder} />
    </>
  );
};
