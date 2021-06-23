import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


const Header =()=> {
    const classes = useStyles();
    return(
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
           ADMIN 
          </Typography>
          <Button color="inherit">Pressable</Button>
        </Toolbar>
        </AppBar>
    )
};

export default Header;