import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';


import Test from './../Test';

const styles={
	image:{
		backgroundImage:'url('+"./images/new.jpg"+')',
		height:'auto',
		backgroundSize:'cover',
		height:'650px'
	},
	text:{fontFamily: 'Bowlby One SC'+','+'cursive',
			fontWeight:'bold'},
	textLine:{color:'red',fontSize:70},
	welcome:{fontFamily: 'Marcellus SC'+','+'serif',padding:200},
	paper:{},
	paperStructure:{paddingTop:100,paddingLeft:50,paddingRight:50,paddingBottom:100},
};


export default class Welcome extends React.Component{
	 constructor(props) {
	 	super(props);
	 	this.state={buttonLabel:'SIGN UP',buttonState:true};
	 	
	 }

 
	 componentWillReceiveProps(nextProps) {

	 	if(nextProps.location.pathname=='/')
	 		this.setState({buttonLabel:'SIGN UP'})
	 	else if(nextProps.location.pathname=='/signup')
	 		this.setState({buttonLabel:'LOGIN'})
	 	else
	 		this.setState({buttonLabel:'SIGN UP'})

	 }

	 handlebutton=()=>{
	 	this.setState({buttonState:!this.state.buttonState})
	 	this.setState({buttonLabel:this.state.buttonState?'LOGIN':'SIGN UP'})

	 	if(this.state.buttonLabel=='LOGIN')
	 		this.props.router.push('/',{buttonLabel:'SIGN UP'})
	 	else
	 		this.props.router.push('/signup',{buttonLabel:'LOGIN'})

	 };

	render() {	
		return (
		<div className="row">
			<div className="col-md-7" style={styles.image}>
				<h1 style={styles.welcome}>Welcome To <span style={styles.text}>Link<span style={styles.textLine}>U</span></span></h1>
			</div>

			<div className="col-md-5" style={styles.paper}>

			<div style={{float:'right',paddingTop:30,paddingRight:20}}>
				<FlatButton secondary={true} label={this.state.buttonLabel} onTouchTap={this.handlebutton} />
			</div>
				<div style={styles.paperStructure}>
				{this.props.children}
   				 
				
				</div>
		 	</div>
		</div>
		);
	}
}
