import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store, { history } from './store/configureStore';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ru } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
