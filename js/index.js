import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './reducers/rootReducer';
import jwt from 'jsonwebtoken';
import {setCurrentUser} from './actions/authAction';

import io from 'socket.io-client';


injectTapEventPlugin();

const store=createStore(rootReducer,compose(applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension():f=>f));      

if(localStorage.jwtToken){
	store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}


ReactDom.render(
	<MuiThemeProvider >
	<Provider store={store}>
    <App/>
 	</Provider>
  </MuiThemeProvider>
  
  ,document.getElementById('root'));