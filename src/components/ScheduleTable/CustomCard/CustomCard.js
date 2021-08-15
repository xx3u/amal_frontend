import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 100,
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 3,
    right: 3,
    padding: 0,
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
      <CardActions>{delBtn}</CardActions>
    </Card>
  );
};

export default CustomCard;
