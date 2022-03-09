import {version} from "../lib/version";

Template.home.onCreated(function()
{
	console.log(`Meteor Micro Server - ${version}`);
});