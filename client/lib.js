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
