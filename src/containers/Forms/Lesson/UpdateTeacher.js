import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Grid, TextField } from '@material-ui/core';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getTeachersBySubject } from '../../../store/actions/teachersActions';

const UpdateTeacher = ({ isOpen, handleClose, oldTeacherName, startTime, updateTeacherSubmit, subjectId }) => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachersBySubject);
  const [newTeacher, setNewTeacher] = useState(null);

  useEffect(() => {
    setNewTeacher(null);
  }, [isOpen]);

  useEffect(() => {
    subjectId && dispatch(getTeachersBySubject(subjectId));
  }, [subjectId]);

  const autocompleteChangeHandler = (value) => {
    setNewTeacher(value);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'sm'} fullWidth={true}>
      <DialogContent>
        <FormSubmission
          title={'Замена учителя'}
          onSubmit={(e) => {
            updateTeacherSubmit(e, newTeacher.id);
          }}
        >
          <Grid item xs={12}>
            <FormItem
              name='date'
              label='Начиная с этого времени'
              value={startTime ? startTime.toLocaleString('ru', { timeZone: 'UTC' }) : ''}
              type='text'
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormItem name='oldTeacher' value={oldTeacherName} label='Учитель' type='text' disabled />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id='combo-box-demo'
              options={teachers}
              getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
              value={newTeacher}
              onChange={(e, value) => autocompleteChangeHandler(value)}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' label='Заменить на' placeholder='Учитель' required />
              )}
            />
          </Grid>
        </FormSubmission>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTeacher;
