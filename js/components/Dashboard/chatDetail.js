import React from 'react'
import Paper from 'material-ui/Paper';


export default class ChatDetail extends React.Component{
constructor(props) {
	super(props);
}
render(){
   return (
    <div>
    {this.props.code=='green'?
        <Paper style={{marginLeft:480,width:500,marginBottom:10}}>
        <div style={{overflow:'hidden'}}>
        <div style={{float:'left',width:400}}>
            <div style={{color:'green',fontWeight:'bold',fontSize:12,paddingLeft:5,paddingTop:5}}>{this.props.user}</div>
            <div style={{fontSize:15,paddingLeft:5,paddingTop:5,paddingBottom:5,wordWrap:'break-word'}}>{this.props.message}</div>
        </div>
        <div style={{float:'right'}}>
            <div style={{color:'grey',fontSize:10,paddingTop:10,paddingRight:10}}>{this.props.date}</div>
            <div style={{color:'grey',fontSize:10,paddingRight:10}}>{this.props.time}</div>
        </div>
        </div>
        </Paper>
    :
        <Paper style={{width:500,marginBottom:10}}>
        <div style={{overflow:'hidden'}}>
        <div style={{float:'left',width:400}}>
            <div style={{color:'red',fontWeight:'bold',fontSize:12,paddingLeft:5,paddingTop:5}}>{this.props.user}</div>
            <div style={{fontSize:15,paddingLeft:5,paddingTop:5,paddingBottom:5,wordWrap:'break-word'}}>{this.props.message}</div>
        </div>
        <div style={{float:'right'}}>
            <div style={{color:'grey',fontSize:10,paddingTop:10,paddingRight:10}}>{this.props.date}</div>
            <div style={{color:'grey',fontSize:10,paddingRight:10}}>{this.props.time}</div>
        </div>
        </div>
        </Paper>
    }
     
     </div>
               
  )
}
}