import {APP_VERSION, isAdmin} from "../lib/lib";

Template.registerHelper("active__ifRouteActive", function(route)
{
    let r = Router.current().route.getName();
    return r === route ? "active" : "";
});

Template.registerHelper("isAdmin", function()
{
    return isAdmin(Meteor.userId());
});

Template.registerHelper("formatDate", function(date)
{
    if (!date)
    {
        return;
    }

    return moment(date).format('MMMM Do h:mm a');
});

Template.registerHelper("appVersion", function()
{
    return APP_VERSION;
});

Template.registerHelper("userEmail", function()
{
    return Meteor.user().emails[0].address;
});

Template.registerHelper("username", function()
{
    return Meteor.user().username;
});
