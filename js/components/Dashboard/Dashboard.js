import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux';
import {logout} from './../../actions/authAction';
import {loadMembers} from './../../actions/memberAction';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {connectedUsers} from './../../actions/connectedClientsAction';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import SocketConnection from './../../socket.service.js';
import * as message from './../../actions/messageAction';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  grey100
} from 'material-ui/styles/colors';

var socket={};

class Dashboard extends React.Component{

  constructor(props) {
    super(props);
      console.log("inside dashboard const")
      console.log(this.props);  
  }

  getChildContext(){
    return {
      socket: SocketConnection.getSocketConnection()
    }
  }

  componentWillMount() {

    socket=SocketConnection.getSocketConnection();

      socket.on('connect',()=>{
        socket.emit('username',{username:this.props.user.username,email:this.props.user.email});
      });

      socket.emit('privateroom',{username:this.props.user.username});

      socket.emit('getConnectedClients',null,(userlist)=>{
          this.props.dispatch(connectedUsers(userlist));
      });

  }

  componentDidMount() {

    socket.on('newConnectedUser',(userlist)=>{
      this.props.dispatch(connectedUsers(userlist));
    });

    socket.on('newDisconnectedUser',(userlist)=>{
      this.props.dispatch(connectedUsers(userlist));
    });

    socket.on('username',(data)=>{
        console.log(data);
      });

    socket.on('privateRecievedMessage',(data)=>{
        this.props.dispatch(message.createMessage({to:data.to,
          from:data.from,
          message:data.message,
          email:this.props.user.email,
          time:data.time,
          date:data.date,
          baseDate:data.baseDate}));

    console.log(data);
        
    });

  }
  

  logout=()=>{

    this.props.signout().then(()=>{
      socket.disconnect();
      this.props.router.push('/');
    });
  }

  render(){

    return(
      <div style={{overflow:'hidden'}}>

    <AppBar
      style={{position:'fixed'}}
      title={<p>LINK<span style={{color:'red',fontSize:40}}>U</span></p>}
      iconElementLeft={<img src="/images/logo.png"height="50px" width="50px"/>}
      iconStyleLeft={{paddingLeft:20}}
      titleStyle={{fontFamily: 'Bowlby One SC'+','+'cursive',fontWeight:'bold',paddingLeft:30}}
      iconElementRight={<FlatButton onTouchTap={this.logout} label="Logout" />}
    />

    <Drawer open={true}
        containerStyle={{zIndex:0}}>
        <div style={{textAlign:'center',paddingTop:90,paddingBottom:30}}>
           <Avatar size={120}>
                A
           </Avatar>
        </div>
        <List>
          <Link to={'/home'} style={{ textDecoration: 'none' }}><ListItem  primaryText="Home" leftIcon={<ContentInbox />} /></Link>
          <Link to={"/profile"} style={{ textDecoration: 'none' }}><ListItem primaryText="Profile" leftIcon={<ContentSend />} /></Link>
          <ListItem primaryText="Album" leftIcon={<ContentDrafts />} />
        </List>  
    </Drawer>
    <div style={{marginLeft:257,marginTop:50}}>
        {this.props.children}
    </div>
  </div>
      );
  }
}

function mapStateToProps(state) {

  return{
    user:state.auth.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    signout: ()=>dispatch(logout())
  };
}

Dashboard.childContextTypes = {
  socket: React.PropTypes.object
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);