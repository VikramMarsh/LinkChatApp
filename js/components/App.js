import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import NotLoggedIn from './Layout/NotLoggedIn';
import Welcome from './Welcome/Welcome';
import Login from './Login/LoginForm';
import SignUp from './SignUp/SignUpForm';
import Reset from './ResetAccount/ResetForm';
import Dashboard from './Dashboard/Dashboard'
import Profile from './Dashboard/Profile';
import Chat from './Dashboard/Chat';
import Home from './Dashboard/Home';

import {connect} from 'react-redux';



class App extends React.Component {

constructor(props) {
	super(props);

}

authenticated=(nextState,replace)=>{
	if(this.props.auth.isAuthenticated){
		replace({
      			pathname: '/dashboard',
      			state:nextState.location.pathname
    		})
	}
}

requireAuth=(nextState,replace)=>{
	
	if(!this.props.auth.isAuthenticated){
		replace({
      			pathname: '/',
      			
      			
    		})
	}
	
}
	
	render() {
		return(
			<Router history={browserHistory}>
					
					<Route path="/" component={Welcome} onEnter={this.authenticated}>
						<IndexRoute component={Login}></IndexRoute>
						<Route path="/signup" component={SignUp}/>
						<Route path="/reset" component={Reset}/>
					</Route>
					<Route path="/dashboard" component={Dashboard} onEnter={this.requireAuth}>
						<IndexRoute component={Home} onEnter={this.requireAuth}></IndexRoute>
						<Route path="/home" component={Home} onEnter={this.requireAuth}/>
						<Route path="/dashboard/:id" component={Chat} onEnter={this.requireAuth}/>
						<Route path="/profile" component={Profile} onEnter={this.requireAuth}/>
					</Route>
			</Router>
			);
	}
}

function mapsStateToProps(state) {
	return{
	auth: state.auth
}
}
export default connect(mapsStateToProps)(App);