import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.users.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Button component={Link} to='/admin-app/students' color='inherit' className={classes.btn}>
              Студенты
            </Button>
            <Button component={Link} to='/admin-app/groups' color='inherit' className={classes.btn}>
              Группы
            </Button>
            <Button component={Link} to='/admin-app/payments' color='inherit' className={classes.btn}>
              Платежи
            </Button>
            <Button component={Link} to='/admin-app/teachers' color='inherit' className={classes.btn}>
              Учителя
            </Button>
            <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleClick} color='inherit'>
              Расписание
            </Button>
            <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem component={Link} to='/admin-app/lessons' onClick={handleClose}>
                Раписание по Группам
              </MenuItem>
              <MenuItem component={Link} to='/admin-app/teachers/lessons' onClick={handleClose}>
                Расписание по Учителям
              </MenuItem>
            </Menu>
          </Grid>
          <Grid item>
            {user ? (
              <>
                <Button color='inherit' className={classes.menuButton}>
                  Hello, {user.username}
                </Button>
                <Button color='inherit' className={classes.menuButton}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to='/login' color='inherit' className={classes.menuButton}>
                  Войти
                </Button>
                <Button component={Link} to='/register' color='inherit' className={classes.menuButton}>
                  Регистрация
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
