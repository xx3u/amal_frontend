import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, Grid} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      flexGrow:1
    },
    logo:{
      flexGrow:1
    }
  }));


const Header =()=> {
    const classes = useStyles();
    return (
        <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" direction="row" >
           <Grid item >
            <Typography variant="h6" className={classes.logo}>
              AMAL LOGO
            </Typography>
           </Grid> 
            <Grid item>
              <Button color="inherit" className={classes.menuButton}>LOGIN</Button>
              <Button color="inherit" className={classes.menuButton}>REGISTER</Button>
            </Grid>
          </Grid>
        </Toolbar>
        </AppBar>
    )
};

export default Header;