import { Box, List, IconButton, Grid } from "@mui/material";
import { MoreHoriz as MoreVertIcon } from "@mui/icons-material";
import { useState } from "react";
import dynamic from "next/dynamic";

import { FileCard } from "./file-card";
import { CardSkeleton } from "../skeleton/card-skeleton";
import { FileItem } from "./file-item";
import CustomNoRowsOverlay from "../tables/custom-no-rows";
const FolderDetail = dynamic(() => import("./folder-detail"), { ssr: false });

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
            <Grid
              spacing={1}
              container
              sx={{
                flexWrap: "wrap",
                my: 5,
              }}
            >
              {folders?.map((folder) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={folder.folder_name}
                >
                  <FileCard
                    setFolder={setFolder}
                    folder={folder}
                    removeItem={removeItem}
                    setOpen={setOpen}
                    downloadFiles={downloadFiles}
                  />
                </Grid>
              ))}
            </Grid>
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

      {open && (
        <FolderDetail removeItem={removeItem} open={true} setOpen={setOpen} folder={curFolder} />
      )}
    </>
  );
};
