import { useCallback, useEffect, useRef, useState } from "react";
import { List, Paper, Divider, ListItem, ListItemText, TextField } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";
import { splitCamelCase } from "src/utils";

export const JobDataTable = () => {
  const { job, fetchJob, updateJob, showConfirmDlg, hideConfirm } = useAuth();

  const [editingItemId, setEditingItemId] = useState(null);
  const [myJob, setJob] = useState();
  const inputRef = useRef();

  useEffect(() => {
    if (!job) fetchJob();
    setJob(job?.data)
  }, [job]);

  const handleChange = useCallback((e, key) => {
    const newJob = { ...myJob, [key]: e.target.value };
    setJob(newJob)
  }, [myJob]);

  const handleBlur = useCallback(() => {
    if (document.activeElement !== inputRef.current) {
      setEditingItemId(null)
      showConfirmDlg({
        open: true,
        close: () => {
          hideConfirm();
          setJob(job.data);
        },
        callback: () => {
          updateJob(job.id, { data: myJob });
          hideConfirm();
        },
      });
    }
  }, [job, myJob]);

  if (!myJob) return <></>;

  return (
    <Paper raised="true">
      <List
        sx={{
          width: "100%",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
        }}
      >
        {myJob && Object.keys(myJob).map((key) => (
          <>
            {key !== "buyers" ? (
              <>
                <ListItem
                  key={`item-${key}`}
                  onDoubleClick={() => setEditingItemId(key)}
                >
                  {editingItemId === key ? (
                    <TextField
                      ref={inputRef}
                      autoFocus={true}
                      label={splitCamelCase(key)}
                      variant="standard"
                      value={myJob[key]}
                      onChange={(e) => handleChange(e, key)}
                      onBlur={handleBlur}
                    />
                  ) : (
                    <ListItemText primary={splitCamelCase(key)} secondary={myJob[key]} />
                  )}
                </ListItem>
                <Divider variant="middle" component="li" />
              </>
            ) : (
              null
            )}
          </>
        ))}
      </List>
    </Paper>
  );
};
