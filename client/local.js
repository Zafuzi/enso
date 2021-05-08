rpc( "ping" );
rpc( "ding" );
rpc( "log", "This only prints on the server" );

Template.registerHelper('date', function() {
	return new Date();
})
