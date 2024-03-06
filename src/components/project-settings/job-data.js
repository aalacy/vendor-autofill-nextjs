import { useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const JobDataTable = () => {
  const { job, fetchJob } = useAuth();

  useEffect(() => {
    if (!job) fetchJob();
  }, [job]);

  if (!job?.data) return <></>;

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
      }}
    >
      {Object.keys(job?.data).map((key) => (
        <>
          {key !== "buyers" ? (
            <ListItem key={`item-${key}`}>
              <ListItemText primary={key} secondary={job?.data[key]} />
            </ListItem>
          ) : (
            <></>
          )}
        </>
      ))}
    </List>
  );
};
