import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const DeleteModal = ({ isOpen }) => {
  const dispatch = useDispatch();

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
        <Grid item xs={12}>
          <Button>
              
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;