import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FaqItem = ({ item }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={item.question + "-content"}
        id={item.question}
      >
        <Typography variant="subtitle1">
          {item.question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{item.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
