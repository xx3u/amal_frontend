import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 86,
  },
  title: {
    fontSize: 14,
  },
});

const CustomCard = ({ id = '', subject = '', teacher = '', onClickHandler, startTime, endTime }) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      variant='outlined'
      onClick={() => {
        onClickHandler(startTime, endTime);
      }}
    >
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
