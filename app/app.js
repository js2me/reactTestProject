import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Home from './screens/Home';
import User from './screens/User';
import Login from './screens/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.css';
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

const reducers = {
    // ... your other reducers here ...
    form: formReducer     // <---- Mounted at 'form'
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);
// <Router history={browserHistory}>
// <Route path="/" component={Home} />
// <Route path="/:username" component={User} />
// </Router>,
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/user/:username" component={User}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
