import React from 'react';
import Header from './Header';
import {Container} from '@material-ui/core';

const Layout =(props)=> {


    return(
        <div>
            <Header/>
            <Container maxWidth='1x'>
                {props.children}
            </Container>
        </div>
    )
}

export default Layout;