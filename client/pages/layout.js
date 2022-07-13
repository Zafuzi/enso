import "../helpers";

Meteor.call("ping", function(error, result)
{
	console.log(result);
});