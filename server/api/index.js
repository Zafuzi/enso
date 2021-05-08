Meteor.methods({
	ping: function() { 
		return {
			data: "pong"
		}
	},
	ding: function() {
		return "dong";
	},
	log: function(data) {
		console.log( data );
	}
});
