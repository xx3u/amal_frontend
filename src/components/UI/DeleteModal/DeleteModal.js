import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Button } from '@material-ui/core';

const DeleteModal = ({ open, deleteButtonHandler, handleClose }) => {
  

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
        {' '}
        Внимание{' '}
      </DialogTitle>
      <DialogContent>
        <DialogContentText> Вы действительно хотите удалить данный урок? </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={deleteButtonHandler}>
          Удалить
        </Button>
        <Button variant='contained' color='secondary' onClick={handleClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
