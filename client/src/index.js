import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// the first argument to createStore are all the reducers
// the second argument is the initial state of our application


ReactDOM.render(
    <Provider store = {store}><App /></Provider>,
    document.querySelector('#root')    
);
//Provider tag is a react component that knows how to read changes from our Redux Store, 
// anytime the store gets new state produced inside it, provider informs & updates all its children(App)  

//ReactDOM takes two args,
//1)the root compoment instance, which we create using JSX <>
//2)where we are attempting to render that component in our DOM