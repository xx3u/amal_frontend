import React from 'react';
import {Container} from '@material-ui/core';
import Header from './Header';


const Layout =({children})=> (
        <div>
            <Header/>
            <Container maxWidth='xl'>
                {children}
            </Container>
        </div>
    )
export default Layout;