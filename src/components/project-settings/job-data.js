import { useEffect } from "react";
import { List, Paper, Divider, ListItem, ListItemText } from "@mui/material";

import { useAuth } from "src/hooks/use-auth";

export const JobDataTable = () => {
  const { job, fetchJob } = useAuth();

  useEffect(() => {
    if (!job) fetchJob();
  }, [job]);

  if (!job?.data) return <></>;

  return (
    <Paper raised>
      <List
        sx={{
          width: "100%",
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
        }}
      >
        {Object.keys(job?.data).map((key) => (
          <>
            {key !== "buyers" ? (
              <>
                <ListItem key={`item-${key}`}>
                  <ListItemText primary={key} secondary={job?.data[key]} />
                </ListItem>
                <Divider variant="middle" component="li" />
              </>
            ) : (
              <></>
            )}
          </>
        ))}
      </List>
    </Paper>
  );
};
