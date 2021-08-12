import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 86,
  },
});

const CustomCard = ({ id = '', subject = '', teacher = '', group = '', onClickHandler, openDeleteModal }) => {
  const classes = useStyles();

  let delBtn = null;

  if (subject !== '' && teacher !== '') {
    delBtn = (
      <>
        <IconButton onClick={(e) => openDeleteModal(e, id)}>
          <DeleteForever />
        </IconButton>
      </>
    );
  }

  return (
    <Card className={classes.root} variant='outlined' onClick={onClickHandler}>
      <CardContent>
        <Typography variant='body1' component='p'>
          {subject} {delBtn}
        </Typography>
        <Typography variant='body2' component='p'>
          {teacher}
        </Typography>
        <Typography variant='body2' component='p'>
          {group}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
