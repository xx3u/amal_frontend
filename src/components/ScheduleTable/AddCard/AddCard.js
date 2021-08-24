import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
const AddCard = ({ disabled = true, onClickHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      {!disabled && (
        <CardActions className={classes.cardActions}>
          <>
            <IconButton onClick={onClickHandler}>
              <AddCircleOutlineIcon fontSize='large' color='disabled' />
            </IconButton>
          </>
        </CardActions>
      )}
    </Card>
  );
};

export default AddCard;
