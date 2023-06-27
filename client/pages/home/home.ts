import {ReactiveVar} from "meteor/reactive-var";
import {Alert} from "../../alerts";

Template.home.onCreated(function()
{
	const instance = this;

	instance.count = new ReactiveVar(0);
});

Template.home.events(
{
	"click .home__showSuccess": function()
	{
		Alert.success("This is a toast");
	},
	"click .home__showError": function(event, instance)
	{
		Alert.error("This is a toast");
	},
	"click .home__showWarning": function()
	{
		Alert.warning("This is a toast");
	},
	"click .home__showInformation": function(event, instance)
	{
		Alert.information("This is a toast");
	},
});