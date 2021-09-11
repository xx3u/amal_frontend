import React, { useState, useEffect } from 'react';
import { Grid, MenuItem, IconButton, Tooltip } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormItem from '../../../components/UI/Form/FormItem/FormItem';
import FormSubmission from '../../../components/UI/Form/FormSubmission/FormSubmission';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStreams } from '../../../store/actions/streamsAction';
import { fetchGroups } from '../../../store/actions/groupsAction';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import CreateStreamForm from '../Stream/CreateStreamForm';

const useStyles = makeStyles(() => ({
  alert: {
    width: '100%',
    marginTop: '10px',
  },
}));

const statuses = [
  {
    value: 'Активный',
  },
  {
    value: 'В резерве',
  },
  {
    value: 'Отчисленный',
  },
  {
    value: 'В ожидании',
  },
];

const languages = [
  {
    value: 'KZ',
    label: 'КАЗ',
  },
  {
    value: 'RU',
    label: 'РУС',
  },
  {
    value: 'ENG',
    label: 'АНГ',
  },
];

const StudentForm = ({ title, submitData, selectedStudent, id, error }) => {
  const classes = useStyles();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    grade: '',
    language: '',
    school: '',
    parentsContacts: '',
    streamId: '',
    status: 'В ожидании',
    groupId: null,
    address: '',
    telephone: '',
    email: '',
  });
  const { streams } = useSelector((state) => state.streams);
  const { groups } = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreams());
    dispatch(fetchGroups());
  }, []);

  useEffect(() => {
    selectedStudent && setStudent(selectedStudent);
  }, [selectedStudent]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    id ? submitData(id, student) : submitData(student);
  };

  const [isOpen, setIsOpen] = useState({ status: false });

  const openStreamForm = () => {
    setIsOpen({ status: true });
  };

  return (
    <FormSubmission title={title} maxWidth='md' onSubmit={submitFormHandler}>
      {error && (
        <Alert severity='error' className={classes.alert}>
          <AlertTitle>Ошибка</AlertTitle>
          {error ? error.data : error.message}
        </Alert>
      )}
      <Grid item xs={4}>
        <FormItem
          name='firstName'
          value={student.firstName}
          onChange={inputChangeHandler}
          label='Имя'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem
          name='lastName'
          value={student.lastName}
          onChange={inputChangeHandler}
          label='Фамилия'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={4}>
        <FormItem
          name='middleName'
          value={student.middleName}
          onChange={inputChangeHandler}
          label='Отчество'
          type='text'
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='grade'
          value={student.grade}
          onChange={inputChangeHandler}
          label='Класс'
          type='integer'
          required
        />
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='language'
          value={student.language}
          onChange={inputChangeHandler}
          label='Язык обучения'
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
      <Grid item xs={6}>
        <FormItem name='school' value={student.school} onChange={inputChangeHandler} label='Школа' type='text' />
      </Grid>
      <Grid item xs={12}>
        <FormItem
          name='parentsContacts'
          value={student.parentsContacts}
          onChange={inputChangeHandler}
          label='Контакты родителей'
          type='text'
          required
        />
      </Grid>
      <Grid item xs={5}>
        <FormItem
          name='streamId'
          value={student.streamId}
          onChange={inputChangeHandler}
          label='Направление'
          type='text'
          required
          select
        >
          {streams.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </FormItem>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title='Добавить направление'>
          <IconButton onClick={openStreamForm}>
            <AddBoxIcon color='inherit' fontSize='large' />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='status'
          value={student.status}
          onChange={inputChangeHandler}
          label='Статус'
          type='text'
          required
          select
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </FormItem>
      </Grid>
      <Grid item xs={3}>
        <FormItem
          name='groupId'
          value={student.groupId}
          onChange={inputChangeHandler}
          label='Группа'
          type='text'
          select
        >
          {groups.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.groupName}
            </MenuItem>
          ))}
        </FormItem>
      </Grid>
      <Grid item xs={12}>
        <FormItem name='address' value={student.address} onChange={inputChangeHandler} label='Адрес' type='text' />
      </Grid>
      <Grid item xs={6}>
        <FormItem
          name='telephone'
          value={student.telephone}
          onChange={inputChangeHandler}
          label='Телефон'
          type='text'
        />
      </Grid>
      <Grid item xs={6}>
        <FormItem name='email' value={student.email} onChange={inputChangeHandler} label='Email' type='text' />
      </Grid>
      <Grid container>
        <CreateStreamForm isOpen={isOpen} title='Добавить направление' />
      </Grid>
    </FormSubmission>
  );
};

export default StudentForm;
