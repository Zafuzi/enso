getUser = () => Meteor.user();
isUserLogged = () => !!getUser();

var dokay = function(r) { console.log( r ); return; }
var dfail = function( err ) { console.error( err ); return; }

rpc = function( cmd, data, okay = dokay, fail = dfail ) {
	Meteor.call( cmd, data, function( err, r ) {
		if( err ) {
			fail( err );
			return;
		}

		if( ! r ) return;

		okay( r );
	});
}

// global helpers
Template.registerHelper('date', function() {
	return new Date();
});

Template.registerHelper('user', function() {
	return getUser();
});

Template.registerHelper('logged', function() {
	return isUserLogged();
});

Template.registerHelper('logout', function() {
	return "Meteor.logout();"
});
