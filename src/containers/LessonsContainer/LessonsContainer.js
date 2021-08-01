import { Grid, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchGroups } from '../../store/actions/groupsAction';

const LessonsContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  const { groups } = useSelector((state) => state.groups);

  return (
    <Grid item xs={12}>
      <Autocomplete
        id='groups-lessons'
        options={groups}
        getOptionLabel={(option) => option.groupName}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' placeholder='Выберите' />}
      />
    </Grid>
  );
};

export default LessonsContainer;
