import { Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import { addNewGroup } from '../../../store/actions/groupsAction';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchStudents } from '../../../store/actions/studentsAction';

const GroupForm = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [group, setGroup] = useState({
    groupName: '',
  });
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setGroup({ ...group, groupName: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewGroup(group, selectedStudents));
    setGroup({ ...group, groupName: '' });
    setSelectedStudents([]);
  };

  const emptyGroupFilter = (option) => !option.groupId;

  return (
    <FormSubmission title='Добавить группу' maxWidth='sm' onSubmit={submitFormHandler}>
      <Grid item xs={12}>
        <FormItem
          name='name'
          value={group.groupName}
          onChange={inputChangeHandler}
          label='Наименование'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          value={selectedStudents}
          onChange={(event, selectedStudents) => {
            setSelectedStudents(selectedStudents);
          }}
          multiple
          id='tags-outlined'
          filterOptions={(options) => {
            return options.filter(emptyGroupFilter);
          }}
          options={students}
          getOptionLabel={(option) => `${option.lastName} ${option.firstName}`}
          filterSelectedOptions
          noOptionsText={'список пуст'}
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label='Добавить студентов' placeholder='Выберите' />
          )}
        />
      </Grid>
    </FormSubmission>
  );
};

export default GroupForm;
