import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useDispatch } from 'react-redux';
import { addNewStream } from '../../../store/actions/streamsAction';

const CreateStreamForm = ({ isOpen, title }) => {
  const dispatch = useDispatch();

  const [stream, setStream] = useState({
    name: '',
  });

  const [open, setOpen] = useState(isOpen.status);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen.status);
  }, [isOpen]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setStream((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addNewStream(stream));
    setOpen(false);
    setStream({
      name: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={title} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            <FormItem
              name='name'
              label='Имя потока'
              type='text'
              value={stream.name}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStreamForm;
