import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ContentSend from 'material-ui/svg-icons/content/send';
import Chip from 'material-ui/Chip';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as message from './../../actions/messageAction';
import ChatDetail from './chatDetail';
import {Redirect} from 'react-router';
import ReactDOM from 'react-dom';

class ChatBox extends React.Component{
	constructor(props) {
		super(props);
		this.state={val:''};
		console.log("inside chat cons")				
	}
	
	handleChange=(e)=>{
		e.preventDefault();
		this.setState({val:e.target.value});
	}

	componentWillMount() {
		this.context.socket.emit('to:from',{to:this.props.params.id,from:this.props.user.username});
		this.props.dispatch(message.getMessages(this.props.user.email,this.props.params.id,this.props.user.username))
	}

	componentDidMount() {
		this.context.socket.on('betweenUser',(data)=>{
			console.log(data);
			this.props.dispatch(message.saveMessage(data));
		});

		// Scroll to the bottom on initialization
    var len = this.props.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + len]);
    if (node) {
      node.scrollIntoView();
    }
	}

	componentDidUpdate() {
  		// Scroll to the bottom on initialization
    var len = this.props.messages.length - 1;
    const node = ReactDOM.findDOMNode(this['_div' + len]);
    if (node) {
      node.scrollIntoView();
    }
  }

	componentWillUnmount() {
		// this.context.socket.emit('leave:to:from',{to:this.props.params.id,from:this.props.user.username});
	}

	handleSubmit=(e)=>{
		var currentDate=new Date();
		var customTime=currentDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'});
		var customDate=currentDate.toDateString();

		e.preventDefault();
		this.context.socket.emit('privateSentMessage',
			{to:this.props.params.id,
			from:this.props.user.username,
			message:this.state.val,
			email:this.props.user.email,
			time:customTime,
			date:customDate,
			baseDate:currentDate});
		

		this.props.dispatch(message.createMessage({to:this.props.params.id,
			from:this.props.user.username,
			message:this.state.val,
			email:this.props.user.email,
			time:customTime,
			date:customDate,
			baseDate:currentDate}));

		this.props.dispatch(message.saveMessage({to:this.props.params.id,
			from:this.props.user.username,
			message:this.state.val,
			email:this.props.user.email,
			time:customTime,
			date:customDate,
			baseDate:currentDate}));

		
		this.setState({val:''});

	}
	
	render(){

		const messages=this.props.messages.map((messageContent,id)=>{
			if(messageContent.from===this.props.user.username)
			{
			return <ChatDetail message={messageContent.message}
			code="green" 
			user={messageContent.from}
			date={messageContent.date} 
			time={messageContent.time}
			key={id}
			ref={(ref) => this['_div' + id] = ref}/>
		}
		else
		{
			return <ChatDetail message={messageContent.message}
			code="red" 
			user={messageContent.from}
			date={messageContent.date} 
			time={messageContent.time}
			key={id}
			ref={(ref) => this['_div' + id] = ref}/>	
		}
		});

		return(

		<Paper>
			<div style={{paddingLeft:20,paddingTop:20,paddingRight:20}}>
				<h3 style={{fontFamily: 'Bowlby One SC'+','+'cursive'}}>Chat With {this.props.params.id}</h3>
				<div style={{height:'455px',
				overflowY:'auto',
				borderRadius:'5px',border:'2px'+' '+'solid'+' '+'#EEEEEE',
				boxShadow:'1px'+' '+'1px'+' '+'1px'+' '+'0'+' '+'#888888'+','+'-1px'+' '+'-1px'+' '+'1px'+' '+'0'+' '+'#888888',
					padding:20}}>
					<div>	
						{messages}
        			</div>
				</div><br/>
				<div className='row'>
				<div className='col-md-10'>
				<TextField fullWidth={true} hintText="Type Message" value={this.state.val} onChange={this.handleChange}/>
				</div>
				<div className='col-md-2'>
				<RaisedButton secondary={true} label="Send" icon={<ContentSend />} onClick={this.handleSubmit}/>
				</div>
				</div>
			</div>
			</Paper>
			)
	}
}

function mapStateToProps(state) {
	return{
		user:state.auth.userInfo,
		messages:state.messages,
		connectedClients:state.connectedUsers
	}
}

ChatBox.contextTypes = {
	socket: React.PropTypes.object
}

export default connect(mapStateToProps)(ChatBox)

