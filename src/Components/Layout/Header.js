import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      flexGrow:1
    },
    title: {
      flexGrow: 2,
    },
    logo:{
      flexGrow:1
    }
  }));


const Header =()=> {
    const classes = useStyles();
    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
           LOGO
          </Typography>
          <Typography variant="h6" className={classes.title}>
           AMAL 
          </Typography>
          <Button color="inherit" className={classes.menuButton}>LOGIN</Button>
          <Button color="inherit" className={classes.menuButton}>REGISTER</Button>
        </Toolbar>
        </AppBar>
    )
};

export default Header;