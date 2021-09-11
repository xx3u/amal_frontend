import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/usersActions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    '&.active': {
      boxShadow: '  0 0 8px rgba(255,255,255,0.8) ',
    },
  },
  logo: {
    flexGrow: 1,
    marginRight: theme.spacing(3),
    textDecoration: 'none',
    color: 'inherit',
    '&.visited': {
      color: 'inherit',
    },
  },
  btn: {
    marginRight: 10,
    '&.active': {
      boxShadow: '  0 0 8px rgba(255,255,255,0.8) ',
    },
  },
  checked: {
    boxShadow: '  0 0 8px rgba(255,255,255,0.8) ',
    marginRight: 10,
  },

  buttonsArea: {
    marginRight: 'auto',
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
    if (window.location.toString().includes('lessons')) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const signOut = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Typography variant='h6' className={classes.logo} component={Link} to={'/'}>
              AMAL EDU
            </Typography>
          </Grid>
          {user && (
            <Grid item className={classes.buttonsArea}>
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
                    className={(checked && classes.checked) || classes.btn}
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
                  <Button
                    component={NavLink}
                    to='/admin-app/attendance'
                    color='inherit'
                    className={classes.btn}
                    onClick={changeStyle}
                  >
                    Журнал посещений
                  </Button>

                  <Button
                    component={NavLink}
                    to='/register'
                    color='inherit'
                    className={classes.menuButton}
                    onClick={changeStyle}
                  >
                    Добавить пользователя
                  </Button>
                </>
              ) : (
                <>
                  <Button component={NavLink} to='/admin-app/lessons/teachers' color='inherit' className={classes.btn}>
                    Расписание
                  </Button>
                  <Button
                    component={NavLink}
                    to='/admin-app/attendance'
                    color='inherit'
                    className={classes.btn}
                    onClick={changeStyle}
                  >
                    Журнал посещений
                  </Button>
                </>
              )}
            </Grid>
          )}
          <Grid item>
            <Grid container alignItems='center'>
              {user && (
                <>
                  <Grid item>
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item>
                    <Typography variant='button'>{user.username}</Typography>
                  </Grid>

                  <Grid item>
                    <Button color='inherit' onClick={signOut} className={classes.menuButton}>
                      Выйти
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
