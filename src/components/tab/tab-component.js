import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 3, pt: 1 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TabComponent({ nodes }) {
  const [value, setValue] = useState(0);
  const orientation = "horizontal"

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        selectionFollowsFocus
        orientation={orientation}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        aria-label="Tab component"
        sx={{ px: 3 }}
      >
        {nodes.map(({ title }, i) => (
          <Tab key={i} label={title} {...a11yProps(i)} />
        ))}
      </Tabs>
      {nodes.map(({ node }, i) => (
        <TabPanel key={i} value={value} index={i}>
          {node}
        </TabPanel>
      ))}
    </Box>
  );
}
