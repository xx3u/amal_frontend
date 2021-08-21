import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { CardActions, IconButton } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
    minHeight: 100,
    height: '100%',
  },
  cardActions: {
    display: 'flex',
    'flex-direction': 'column',

    alignItems: 'center',
    width: '100%',
  },
}));
const EmptyCard = ({ disabled = true, onClickHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      {!disabled && (
        <CardActions className={classes.cardActions}>
          <>
            <IconButton onClick={onClickHandler}>
              <AddCircleIcon fontSize='large' color='disabled' />
            </IconButton>
          </>
        </CardActions>
      )}
    </Card>
  );
};

export default EmptyCard;
