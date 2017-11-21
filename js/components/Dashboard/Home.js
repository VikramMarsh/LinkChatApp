import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {connect} from 'react-redux';
import {loadMembers} from './../../actions/memberAction';
import {connectedUsers} from './../../actions/connectedClientsAction';
import {Link} from 'react-router';
import * as message from './../../actions/messageAction';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  }
};

var onlineUsers=[];
class Home extends React.Component{
	constructor(props) {
		super(props);
		this.state={memberList:[],onlineUsers:[]}
		console.log("inside home const");
		console.log(this.props);
	}

	getMessages=(email,to,from)=>{
		this.props.dispatch(message.getMessages(email,to,from));
	}

	componentWillMount() {

		const {socket}=this.context;

		this.props.members()
        .then((res)=>res.json())
        .then((data)=>{
          data.users.map((user,index)=>this.setState({
            memberList:[
            ...this.state.memberList,
            <ListItem key={index} primaryText={user.firstName}/>
            ]
          }))
        });

       onlineUsers=this.props.connectedClientsList.map((user,index)=>{
			if(user.username!=this.props.user.username)
			return <Link key={index} to={"/dashboard/"+user.username} style={{ textDecoration: 'none' }}><ListItem primaryText={user.username} onClick={()=>this.getMessages(this.props.user.email,user.username,this.props.user.username)}/></Link>
		});

	}

	componentWillReceiveProps(nextProps) {

		console.log("will recieve");

		onlineUsers=nextProps.connectedClientsList.map((user,index)=>{
			if(user.username!=this.props.user.username)
			return <Link key={index} to={"/dashboard/"+user.username} style={{ textDecoration: 'none' }}><ListItem primaryText={user.username} onClick={()=>this.getMessages(this.props.user.email,user.username,this.props.user.username)}/></Link>
		});
	}


	render(){
		
		return(
			<div style={{padding:50}}>
			<Paper>
			<Tabs>
		    <Tab label="Online Users">
		      <div style={{height:400,overflowY:'auto'}}>
		        {onlineUsers}
		      </div>
		    </Tab>
		    <Tab label="Registered User">
		      <div style={{height:400,overflowY:'auto'}}>
		       <List>
		       {this.state.memberList}
          	   </List> 
		      </div>
		    </Tab>
		  </Tabs>
		  </Paper>
		  </div>);
	}
}

function mapStateToProps(state) {
	return{
		user:state.auth.userInfo,
		connectedClientsList:state.connectedUsers
	}
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    members:()=>dispatch(loadMembers()),
  };
}

Home.contextTypes = {
	socket: React.PropTypes.object
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)