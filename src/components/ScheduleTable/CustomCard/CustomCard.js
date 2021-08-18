import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 100,
    height: '100%',
  },
});

const CustomCard = ({ subject = '', teacher = '', group = '', onClickHandler, onDeleteHandler }) => {
  const classes = useStyles();

  let delBtn = null;

  if (subject !== '' && teacher !== '') {
    delBtn = (
      <IconButton className={classes.deleteBtn} onClick={onDeleteHandler}>
        <Clear />
      </IconButton>
    );
  }

  return (
    <Card className={classes.root} variant='outlined' onClick={onClickHandler}>
      <CardHeader action={delBtn} title={subject} subheader={teacher || group} />
    </Card>
  );
};

export default CustomCard;
