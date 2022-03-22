import {version} from "../lib/version";

export const currentUser = function()
{
	return Meteor.user();
}

export const isUserLoggedIn = function()
{
	return !!currentUser();
}

// global helpers
Template.registerHelper('today', function()
{
	return new Date();
});

Template.registerHelper('userId', function(user)
{
	user = user || currentUser();
	return user?._id;
});

Template.registerHelper('userEmail', function(user)
{
	user = user || currentUser();
	return user?.emails[0]?.address;
});

Template.registerHelper('username', function(user)
{
	user = user || currentUser();
	return user?.username;
});

Template.registerHelper('userLabel', function(user)
{
	user = user || currentUser();
	return user?.username || user?.emails[0]?.address || user?._id;
});

Template.registerHelper('isUserLoggedIn', isUserLoggedIn);

Template.registerHelper("version", function()
{
	return version;
})

Template.registerHelper("currentUser", currentUser);
