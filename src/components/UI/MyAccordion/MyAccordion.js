import React from 'react';
import { makeStyles, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditableTitle from '../EditableTitle/EditableTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  accordion: {
    border: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: 10,
  },
}));

const MyAccordion = ({ groupName, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={classes.accordion}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          <EditableTitle value={groupName} />
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyAccordion;
