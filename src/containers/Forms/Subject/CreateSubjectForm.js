import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useDispatch } from 'react-redux';
import { addNewSubject } from '../../../store/actions/subjectsAction';

const CreateSubjectForm = ({ isOpen, title }) => {
  const dispatch = useDispatch();

  const [subject, setSubject] = useState({
    subjectName: '',
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
    setSubject((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewSubject(subject));
    setOpen(false);
    setSubject({
      subjectName: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission title={title} onSubmit={submitFormHandler}>
          <Grid item xs={12}>
            <FormItem
              name='subjectName'
              label='Имя предмета'
              type='text'
              value={subject.subjectName}
              onChange={inputChangeHandler}
              required
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectForm;
