import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './pages/Login';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import User from './pages/User';

import { Provider } from 'react-redux';

// const webSocket = new WebSocket(
//   'ws://' +
//     window.location.host.split(':')[0] +
//     (window.location.port && `:${window.location.port}`) +
//     '/websocket'
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

// create instance of web socket
const webSocket = new WebSocket('ws://localhost:4000');

webSocket.onmessage = (message) => {
  console.log(message);
  // someone sends message -> messenger api -> redis -> ws server -> here
  store.dispatch(setInquiryMsg(message.data));
};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
