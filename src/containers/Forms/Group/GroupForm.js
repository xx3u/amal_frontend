import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import { addNewGroup } from '../../../store/actions/groupsAction';
import { useDispatch } from 'react-redux';

const GroupForm = () => {
  const dispatch = useDispatch();

  const [group, setGroup] = useState({
    name: '',
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(addNewGroup(group));
  };

  return (
    <FormSubmission title='Добавить группу' maxWidth='sm' onSubmit={submitFormHandler}>
      <Grid item xs={12}>
        <FormItem
          name='name'
          value={group.name}
          onChange={inputChangeHandler}
          label='Наименование'
          type='text'
          required
        />
      </Grid>
    </FormSubmission>
  );
};

export default GroupForm;
