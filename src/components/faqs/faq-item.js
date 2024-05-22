import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const FaqItem = ({ item }) => {
    return (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={item.question + '-content'}
          id={item.question}
        >
          {item.question}
        </AccordionSummary>
        <AccordionDetails>
        {item.answer}
        </AccordionDetails>
      </Accordion>
    )
}