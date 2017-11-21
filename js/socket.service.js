var IO = require('socket.io-client');

var socket = null;

export default {
	getSocketConnection() {
    if(localStorage.jwtToken){
      var self = this;
        // reset the socket
        // if it's not the first connect() call this will be triggered
      if( self.socket) {
        console.log("inside self")
        console.log(self.socket)
        //self.socket.disconnect();
        //delete self.socket;
        return self.socket;
        
      }
      else {
        console.log("inside new socket")

        // standard connectiong procedure
        self.socket = IO({ // adapt to your server
          'transports': ['websocket', 'polling'],
          'query':'jwtToken=' + localStorage.jwtToken,
        });
        console.log(self.socket);
        return self.socket;
      }
    }
	}
}