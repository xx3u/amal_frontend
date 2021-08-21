import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Button } from '@material-ui/core';

const InfoModal = ({ open, handleClose, title, content }) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='secondary' onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
