import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardHeader, Grid, IconButton } from '@material-ui/core';
import { Clear, Edit } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
    minHeight: 100,
    height: '100%',
  },
  card: {
    alignItems: 'stretch',
  },
}));

const CustomCard = ({ title, subheader, onDeleteHandler, onEditHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardHeader
        className={classes.card}
        action={
          <>
            <Grid container direction='column-reverse'>
              {onEditHandler && (
                <IconButton onClick={onEditHandler}>
                  <Edit fontSize='small' />
                </IconButton>
              )}
              {onDeleteHandler && (
                <IconButton onClick={onDeleteHandler}>
                  <Clear fontSize='small' />
                </IconButton>
              )}
            </Grid>
          </>
        }
        title={title}
        subheader={subheader}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
    </Card>
  );
};

export default CustomCard;
