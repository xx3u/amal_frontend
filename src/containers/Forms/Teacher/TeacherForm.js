import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import { fetchSubjects } from '../../../store/actions/subjectsAction';

const TeacherForm = ({ title, submitData, selectedTeacher, id }) => {
  const dispatch = useDispatch();
  const [teacher, setTeacher] = useState(selectedTeacher);
  const subjects = useSelector((state) => state.subjects.subjects);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, []);

  useEffect(() => {
    setTeacher(selectedTeacher);
  }, [selectedTeacher]);

  const languages = [
    {
      value: 'KZ',
      label: 'КАЗ',
    },
    {
      value: 'RU',
      label: 'РУС',
    },
  ];

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    id ? submitData(teacher, id) : submitData(teacher);
  };

  return (
    <FormSubmission title={title} maxWidth='md' onSubmit={submitFormHandler}>
      <Grid item xs={6}>
        <FormItem
          name='firstName'
          value={teacher.firstName || ''}
          onChange={inputChangeHandler}
          label='Имя'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem
          name='lastName'
          value={teacher.lastName || ''}
          onChange={inputChangeHandler}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>

      <Grid item xs={6}>
        <FormItem
          name='language'
          value={teacher.language || ''}
          onChange={inputChangeHandler}
          label='Язык преподования'
          type='text'
          required
          select
        >
          {languages.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </FormItem>
      </Grid>
      <Grid item xs={6} container direction='row' justifyContent='space-between'>
        <Grid item xs={11}>
          <FormItem
            name='subjectId'
            value={teacher.subjectId || ''}
            onChange={inputChangeHandler}
            label='Предмет'
            type='text'
            required
            select
          >
            {subjects.map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>
                {subject.subjectName}
              </MenuItem>
            ))}
          </FormItem>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title='Добавить предмет'>
            <IconButton>
              <AddBoxIcon color='inherit' fontSize='large' />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <FormItem
          name='telephone'
          value={teacher.telephone || ''}
          onChange={inputChangeHandler}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='email' value={teacher.email || ''} onChange={inputChangeHandler} label='Email' type='text' />
      </Grid>
    </FormSubmission>
  );
};

export default TeacherForm;
