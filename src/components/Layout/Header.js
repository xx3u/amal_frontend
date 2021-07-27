import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
  },
  btn: {
    marginRight: 10,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container justifyContent='space-between' direction='row'>
          <Grid item>
            <Typography variant='h6' className={classes.logo}>
              AMAL LOGO
            </Typography>
          </Grid>
          <Grid container item xs={9}>
            <Button
              component={Link}
              to='/admin-app/students'
              color='inherit'
              variant='outlined'
              className={classes.btn}
            >
              СТУДЕНТЫ
            </Button>
            <Button component={Link} to='/admin-app/groups' color='inherit' variant='outlined' className={classes.btn}>
              Группы
            </Button>
            <Button
              component={Link}
              to='/admin-app/payments'
              color='inherit'
              variant='outlined'
              className={classes.btn}
            >
              Платежи
            </Button>
            <Button
              component={Link}
              to='/admin-app/subjects'
              color='inherit'
              variant='outlined'
              className={classes.btn}
            >
              Предметы
            </Button>
          </Grid>
          <Grid item>
            <Button color='inherit' className={classes.menuButton}>
              LOGIN
            </Button>
            <Button color='inherit' className={classes.menuButton}>
              REGISTER
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
