import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {loadProfile,profileUpdate} from './../../actions/profileAction';
import Snackbar from 'material-ui/Snackbar';

class Profile extends React.Component{
	constructor(props) {
		super(props);

		this.state=({firstName:'',
			lastName:'',
			nickName:'',
			address:'',
			number:'',
			country:'',
			state:'',
			city:'',
			hobbies:'',
			interest:'',
			isLoading:false,
			notify:false});
		
	}

	componentWillMount() {
		this.setState({email:this.props.userProfile.email});
		this.props.loadProfile(this.props.userProfile)
				.then((res)=>res.json())
				.then((data)=>{
					console.log("will");
					console.log(data);
					this.setState({firstName:data.firstName,
						lastName:data.lastName,
						nickName:data.userName,
						address:data.address,
						number:data.number,
						country:data.country,
						state:data.state,
						city:data.city,
						hobbies:data.hobbies,
						interest:data.interest
					});
				})
	}

	handleChange=(e)=>{
		
		this.setState({[e.target.name]:e.target.value});
	}

	onSave=()=>{
		this.setState({isLoading:true})
		this.props.profileUpdate(this.state)
					.then((res)=>res.json())
					.then((data)=>{
						console.log("--");
						console.log(data);
						this.setState({isLoading:false,notify:true})
					});

	}

	render(){
		return(<Paper>
			<div style={{padding:30}}>
				<h1 style={{fontFamily: 'Bowlby One SC'+','+'cursive'}}>Profile</h1>
					<br/>
						<TextField 
						floatingLabelText="First Name"
						hintText="First Name"
						name="firstName" 
						value={this.state.firstName}
						onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						
						<TextField 
						floatingLabelText="Last Name"
						hintText="Last Name"
						name="lastName" 
						value={this.state.lastName}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="Nickname"
						hintText="Nickname"
						name="nickName" 
						value={this.state.nickName}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="Address"
						hintText="Address"
						name="address"
						value={this.state.address}
						onChange={this.handleChange} fullWidth={true}/><br/>

						<TextField 
						floatingLabelText="Phone Number"
						hintText="Phone Number"
						name="number"
						value={this.state.number}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="Country"
						hintText="Country"
						name="country"
						value={this.state.country}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="State"
						hintText="State"
						name="state" 
						value={this.state.state}
						onChange={this.handleChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

						<TextField 
						floatingLabelText="City"
						hintText="City"
						name="city" 
						value={this.state.city}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="Hobbies"
						hintText="Hobbies"
						name="hobbies" 
						value={this.state.hobbies}
						onChange={this.handleChange}/><br/>

						<TextField 
						floatingLabelText="Interest"
						hintText="Interest"
						name="interest" 
						value={this.state.interest}
						onChange={this.handleChange}/><br/><br/>

						<RaisedButton label="SAVE" primary={true} onTouchTap={this.onSave} disabled={this.state.isLoading}/>

						<Snackbar
          					open={this.state.notify}
          					message="Profile Updated Successfully!!!"
          					autoHideDuration={3000}/>
				</div>
			</Paper>);
	}
}
function mapStateToProps(state) {
	return{
	userProfile:state.auth.userInfo
}
}
export default connect(mapStateToProps,{loadProfile,profileUpdate})(Profile)