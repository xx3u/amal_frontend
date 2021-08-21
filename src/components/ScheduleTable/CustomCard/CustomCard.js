import React from 'react';
import { IconButton, Card, CardContent, CardActions, Typography, makeStyles, Paper } from '@material-ui/core';
import { Clear, Edit } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 100,
    position: 'relative',
  },
  deleteBtn: {
    padding: 3,
  },
  editBtn: {
    padding: 3,
    paddingRight: 3,
  },
  actionButtons: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const CustomCard = ({
  isVisibleButtons,
  subject = '',
  teacher = '',
  group = '',
  onClickHandler,
  onDeleteHandler,
  onEditHandler,
}) => {
  const classes = useStyles();

  let actionButtons = null;

  if (isVisibleButtons && subject !== '' && teacher !== '') {
    actionButtons = (
      <Paper className={classes.actionButtons} elevation={0}>
        <IconButton className={classes.editBtn} onClick={onEditHandler}>
          <Edit fontSize='small' />
        </IconButton>
        <IconButton className={classes.deleteBtn} onClick={onDeleteHandler}>
          <Clear />
        </IconButton>
      </Paper>
    );
  }

  return (
    <Card className={classes.root} variant='outlined' onClick={onClickHandler}>
      <CardContent>
        <Typography variant='body1' component='p'>
          {subject}
        </Typography>
        <Typography variant='body2' component='p'>
          {teacher}
        </Typography>
        <Typography variant='body2' component='p'>
          {group}
        </Typography>
      </CardContent>
      <CardActions>{actionButtons}</CardActions>
    </Card>
  );
};

export default CustomCard;
