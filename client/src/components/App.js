import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    //compomentDidMount(action creator) is the preffered location for initial AJAX call
    render(){
        return(
            <BrowserRouter>
                <div className='container'>
                    < Header />
                    < Route exact={ true } path='/' component={ Landing } />
                    < Route exact path='/surveys' component={ Dashboard } />
                    < Route path='/surveys/new' component={ SurveyNew } />
                </div>
            </BrowserRouter>
        );
    }
};

export default connect(null, actions)(App);
//connect makes App component able to call ActionCreators, actions are passed to the component as props