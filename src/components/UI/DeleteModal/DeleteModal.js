import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid, Button, Typography } from '@material-ui/core';

const DeleteModal = ({ isOpen, deleteButtonHandler }) => {
  const [open, setOpen] = useState(isOpen.status);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen.status);
  }, [isOpen]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <Grid container item xs={12} justifyContent='space-evenly' alignItems='center'>
          <Typography variant='h6'>Вы хотите удалить данный урок?</Typography>
          <Button variant='contained' color='primary' onClick={deleteButtonHandler}>
            Удалить
          </Button>
          <Button variant='contained' color='secondary' onClick={handleClose}>
            Отмена
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
