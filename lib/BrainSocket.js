function BrainSocket(WebSocketConnection,BrainSocketPubSub){
	this.connection = WebSocketConnection;
	this.event = BrainSocketPubSub;

	this.connection.BrainSocket = this;

	this.connection.digestMessage = function(data){
		try{
			var object = JSON.parse(data);

			if(object.event){
				this.BrainSocket.event.fire(object.event,object.data);
			}

		}catch(e){
			this.BrainSocket.event.fire(data);
		}
	}

	this.connection.onerror = function(e){
		console.log(e);
	}

	this.connection.onmessage = function(e) {
		this.digestMessage(e.data);
	}

	this.success = function(data){
		this.message('app.success',data);
	}

	this.error = function(data){
		this.message('app.error',data);
	}

	this.message = function(event,data){
		var json = {client:{}};
		json.client.event = event;

		if(!data){
			data = [];
		}

		json.client.data = data;

		this.connection.send(JSON.stringify(json));
	}


}