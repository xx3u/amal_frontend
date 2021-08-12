import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 86,
  },
});

const CustomCard = ({ subject = '', teacher = '', onClickHandler }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined' onClick={onClickHandler}>
      <CardContent>
        <Typography variant='body1' component='p'>
          {subject}
        </Typography>
        <Typography variant='body2' component='p'>
          {teacher}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
