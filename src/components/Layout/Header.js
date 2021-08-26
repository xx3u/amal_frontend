import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Grid, Menu, MenuItem, Box } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/usersActions';

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
    marginRight: theme.spacing(3),
  },
  btn: {
    marginRight: 10,
    '&.active': {
      background: 'rgba(0,0,0,0.3)',
    },
  },
  checked: {
    background: 'rgba(0,0,0,0.3)',
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.users.user);
  const isAdminRole = user && user.role === 'admin';

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (window.location.toString().includes('lessons')) {
      setChecked(true);
    }
  }, [window.location]);

  const changeStyle = async () => {
    setChecked(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await setAnchorEl(null);
    setChecked(true);
  };

  const signOut = () => {
    dispatch(logoutUser());
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
          <Box flexGrow={1} display={user ? 'block' : 'none'}>
            {isAdminRole ? (
              <>
                <Button
                  component={NavLink}
                  to='/admin-app/students'
                  color='inherit'
                  className={classes.btn}
                  onClick={changeStyle}
                >
                  Студенты
                </Button>
                <Button
                  component={NavLink}
                  to='/admin-app/groups'
                  color='inherit'
                  className={classes.btn}
                  onClick={changeStyle}
                >
                  Группы
                </Button>
                <Button
                  component={NavLink}
                  to='/admin-app/payments'
                  color='inherit'
                  className={classes.btn}
                  onClick={changeStyle}
                >
                  Платежи
                </Button>
                <Button
                  component={NavLink}
                  to='/admin-app/teachers'
                  color='inherit'
                  className={classes.btn}
                  onClick={changeStyle}
                >
                  Учителя
                </Button>
                <Button
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                  color='inherit'
                  className={checked ? classes.checked : classes.btn}
                >
                  Расписание
                </Button>
                <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                  <MenuItem component={NavLink} to='/admin-app/lessons' onClick={handleClose}>
                    Раписание по Группам
                  </MenuItem>
                  <MenuItem component={NavLink} to='/admin-app/lessons/teachers' onClick={handleClose}>
                    Расписание по Учителям
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={NavLink} to='/admin-app/lessons/teachers' color='inherit' className={classes.btn}>
                Расписание
              </Button>
            )}
          </Box>
          <Box>
            {user && (
              <>
                <Button color='inherit' className={classes.menuButton}>
                  Hello, {user.username}
                </Button>
                <Button color='inherit' onClick={signOut} className={classes.menuButton}>
                  Выйти
                </Button>
                {isAdminRole ? (
                  <Button component={Link} to='/register' color='inherit' className={classes.menuButton}>
                    Регистрация
                  </Button>
                ) : null}
              </>
            )}
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
