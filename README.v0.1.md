BrainSocket.js
============

WebSockets for realtime event-driven js apps.

This js library is a helper class that pairs nicely with the [BrainSocket.php](https://github.com/BrainBoxLabs/brain-socket) Laravel package.

Load the script into your app:

```html
<script type="text/javascript" src="js/brain-socket.min.js" />
```

Create the BrainSocket object:

```javascript
window.app = {};

app.BrainSocket = new BrainSocket(
		new WebSocket('ws://localhost:8080'),
		new BrainSocketPubSub()
);
```

The class requires 2 parameters to get up an running:
- The first is the WebSocket object which should point to a WebSocket server.
- The second is the BrainSocketPubSub class (you can feel free to implement your own just make sure you pass in an object with the `forget`, `listen` and `fire` methods).

**Note:** If you are using our [BrainSocket.php](https://github.com/BrainBoxLabs/brain-socket) package you should see **"Connection Established!"** messages in the terminal window running your WebSocket server when you load your js app in a browser.

Next we can start subscribing to some custom BrainSocket events via `Event.listen`.

```javascript
app.BrainSocket.Event.listen('some.event',function(msg)
{
	console.log(msg);
});

app.BrainSocket.Event.listen('app.success',function(msg)
{
	console.log(msg);
});

app.BrainSocket.Event.listen('app.error',function(msg)
{
	console.log(msg);
});
```

**Note:** The `msg` parameter passed into the event listener is a POJO (Plain Old Javascript Object) that contains `client` and possibly `server` objects (also POJOs), which contain the original client data and any server data that was passed back.

**Note:** The `app.success` and `app.error` events are not required but are helper events for dealing with flash messaging.

To fire an event to the WebSocket server you can call:

```javascript
app.BrainSocket.message('some.event',[some:data]);
```

Typically you would fire these messages after user interactions take place in your app.

Here's an example with jquery:

```javascript
$('button.user-signup').click(function(event)
{

	if(something.happens)
	{
		app.BrainSocket.success('Congrats, Welcome to the team!');
	}else
	{
		app.BrainSocket.error('We\'re sorry, there was an error with your submission.');
	}

	return false;

});
```

And that's it!

Be sure to check out our simple chat app in the `example/` directory.




