import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {Link} from 'react-router-dom';
import validateInput from './../../validations/loginValidations';
import jwt from 'jsonwebtoken';
import isEmpty from 'lodash/isEmpty';
import {setCurrentUser} from './../../actions/authAction';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import CircularProgress from 'material-ui/CircularProgress';

class LoginForm extends React.Component{

	constructor(props) {
		super(props);
		this.state={email:'',
			password:'',
			errors:{},
			isLoading:false
			};
		console.log(this.props);
	}

handlereset=()=>{
	this.props.router.push('/reset');
}

isValidate=()=>{
	const {errors,isValid}=validateInput(this.state);
		if(!isValid){
			this.setState({errors});
		}
	return isValid;
}

handleLogin=()=>{

	if(this.isValidate())
	{
		this.setState({errors:{},isLoading:true});

		fetch('/api/login',{
			method: 'post',  
			headers:{  
				'Content-Type': 'application/json' 
			},  
			body: JSON.stringify(this.state) 
		})
			.then((res)=>res.json())

			.then((data)=>{
				
				if(data.success){
					this.setState({isLoading:false});
					localStorage.setItem('jwtToken',data.jwtToken);
					this.props.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));

					this.props.router.push('/dashboard');
				}
				else{
					this.setState({errors:data,isLoading:false})
				}
			})
			.catch(err=>err);
		
	}

}

handleChange=(e)=>{
	
	this.setState({[e.target.name]:e.target.value});
}

render(){
	const {errors}=this.state;
	return(
		<div>		
			<h3 style={{fontFamily: 'Roboto Slab'+','+'serif'}}>ALREADY HAVE AN ACCOUNT?</h3>
			<br/>

			<TextField
				
				fullWidth={true}
				hintText="Email"
				name="email"
				value={this.state.email}
				onChange={this.handleChange}
				errorText={(errors)?errors.email:''}/><br/>	

			<TextField
				
				fullWidth={true}
				hintText="Password"
				type="password"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
				errorText={(errors)?errors.password:''}/>

			<br/>
			<br/>
					
			<Checkbox
		    	label="Remember Me"/>
	      	<br/>

	      	<div style={{textAlign:'center',paddingBottom:'20px',color:'red'}}>
	      	{(errors.globalError)?errors.globalError:''}
	      	</div>
			<RaisedButton label="LOGIN" fullWidth={true} primary={true} onTouchTap={this.handleLogin} disabled={this.state.isLoading}/>
			<br/><br/>
			 			
			<FlatButton  label="Reset Password?" fullWidth={true} secondary={true} onTouchTap={this.handlereset} /><br/><br/>
			<div style={{textAlign:'center'}}>
			{this.state.isLoading?<CircularProgress />:''}
			</div>
		</div>

		 );			
	}
}


export default connect()(LoginForm);
