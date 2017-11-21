import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

class ResetForm extends React.Component{
	render(){
	return(
		<div>
		<h3 style={{fontFamily: 'Roboto Slab'+','+'serif'}}>Reset Account Password</h3><br/>

		<TextField
			hintText="Enter Email"
			fullWidth={true}/>
			<br/>
			<br/>
		<RaisedButton
			primary={true}
			label='Reset'
			fullWidth={true}/>
		</div>);
}
}

export default ResetForm;
