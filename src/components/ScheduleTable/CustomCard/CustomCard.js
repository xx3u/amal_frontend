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

const CustomCard = ({ id = '', value1 = '', value2 = '' }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography variant='body1' component='p'>
          {value1}
        </Typography>
        <Typography variant='body2' component='p'>
          {value2}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
