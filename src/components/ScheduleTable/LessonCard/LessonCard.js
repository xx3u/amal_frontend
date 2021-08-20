import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton } from '@material-ui/core';
import { Clear, Edit } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 100,
    height: '100%',
  },
});

const CustomCard = ({ title, subheader, onClickHandler, onDeleteHandler, onEditHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined' onClick={onClickHandler}>
      <CardHeader
        action={
          <>
            {onDeleteHandler && (
              <IconButton onClick={onDeleteHandler}>
                <Clear />
              </IconButton>
            )}
            {onEditHandler && (
              <IconButton onClick={onEditHandler}>
                <Edit />
              </IconButton>
            )}
          </>
        }
        title={title}
        subheader={subheader}
      />
    </Card>
  );
};

export default CustomCard;
