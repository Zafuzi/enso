import {version} from "../lib/version";

export const getUser = function()
{
	return Meteor.user();
}

export const isUserLoggedIn = function()
{
	return !!getUser();
}

export const okay = function(r) { console.log( r ); return; }
export const fail = function( err ) { console.error( err ); return; }

export function rpc( cmd, data, okay, fail ) {
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
Template.registerHelper('today', function()
{
	return new Date();
});

Template.registerHelper('user', function()
{
	return getUser();
});

Template.registerHelper('email', function()
{
	return getUser()?.emails[0]?.address;
});

Template.registerHelper('isUserLoggedIn', function() {
	return isUserLoggedIn();
});

Template.registerHelper("version", function()
{
	return version;
})
