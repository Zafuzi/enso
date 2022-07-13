Template.registerHelper("active__ifRouteActive", function(route)
{
    let r = Router.current().route.getName();
    return r === route ? "active" : "";
});