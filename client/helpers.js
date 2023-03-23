import {isAdmin} from "../lib/lib";

Template.registerHelper("active__ifRouteActive", function(route)
{
    let r = Router.current().route.getName();
    return r === route ? "active" : "";
});

Template.registerHelper("isAdmin", function()
{
    return isAdmin(Meteor.userId());
});

Template.registerHelper('formatDate', function(date)
{
    if (!date)
    {
        return;
    }

    return moment(date).format('MMMM Do h:mm a');
});
