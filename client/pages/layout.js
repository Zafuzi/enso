import {APP_VERSION} from "../../lib/lib";

Meteor.call("ping", function(error, result)
{
	console.log(result);
});

Template.layout.onCreated(function()
{
    const currentRoute = Router.current().route.getName();
    document.title = `${document.title} - ${APP_VERSION}`;
})