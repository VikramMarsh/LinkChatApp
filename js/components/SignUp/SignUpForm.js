import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';


import isEmpty from 'lodash/isEmpty';
import validateInput from './../../validations/signupValidation';

class SignUpForm extends React.Component{
	constructor(props) {
		super(props);
		this.state=({firstName:'',
			lastName:'',
			email:'',
			password:'',
			passwordConfirm:'',
			errors:{},
			isLoading:false
			})


			
	}

	handleChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}

	isValidate=()=>{

		const {errors,isValid}=validateInput(this.state);

		if(!isValid){
			this.setState({errors});
		}
		return isValid;
	}

	handleSignUp=()=>{

		if(this.isValidate()){

		this.setState({errors:{},isLoading:true});

		fetch('/api/signup', {  
    			method: 'post',  
			    headers: {  
			      'Content-Type': 'application/json' 
			    },  
			    body: JSON.stringify(this.state)  
			  })	
			.then(res=>res.json())
			.then(data=>{
				if(data.success){
					this.setState({isLoading:false})
					this.props.router.push('/');
				}
				else{
				this.setState({errors:data,isLoading:false})
			}
			})
			.catch(err=>console.log('Request failed', err));
		}
	}

	render(){

	const {errors}=this.state;

	return(
		<div>
			<h3 style={{fontFamily: 'Roboto Slab'+','+'serif'}}> Join Our Community!</h3>
			<br/> 
			<TextField
				
				fullWidth={true}
				value={this.state.firstName}
				onChange={this.handleChange}
				hintText="First Name"
				name="firstName"
				errorText={(errors)?errors.firstName:''}
				/>
				<br/>
			<TextField
				
				fullWidth={true}
				value={this.state.lastName}
				onChange={this.handleChange} 
				hintText="Last Name"
				name="lastName"
				errorText={(errors)?errors.lastName:''}
				/>
				<br/>

			<TextField 
				
				fullWidth={true}
				value={this.state.email}
				onChange={this.handleChange}
				hintText="Email"
				type="email"
				name="email"
				errorText={(errors)?errors.email:''}/>
				<br/>

			<TextField
				
				fullWidth={true} 
				value={this.state.password}
				onChange={this.handleChange}
				hintText="Password"
				type="password"
				name="password"
				errorText={(errors)?errors.password:''}/><br/>

			<TextField
				
				fullWidth={true}
				onChange={this.handleChange}
				value={this.state.passwordConfirm} 
				hintText="Confirm Password"
				type="password"
				name="passwordConfirm"
				errorText={(errors)?errors.passwordConfirm:''}/><br/><br/>



			<RaisedButton label="Sign Up" primary={true} disabled={this.state.isLoading} onTouchTap={this.handleSignUp}/>
			<div style={{textAlign:'center',marginTop:'10px'}}>
			{this.state.isLoading?<CircularProgress />:''}
			</div>
		</div>
		);
}
}

export default SignUpForm;