if (Meteor.isClient)
{
	Router.configure({

		title: "Plankton",

		layoutTemplate: "layout",

		//notFoundTemplate: 'pageNotFound',
		//loadingTemplate: 'loading',
		
		waitOn: function()
		{
			Meteor.subscribe("userData");
		},
		onBeforeAction: function()
		{
			this.next();
		},
	});
}

Router.route("/", {
	name: "home",
	template: "home"
});

Router.route("about", {
	name: "about",
	template: "about"
});

Router.route("dashboard", {
    name: "dashboard",
    template: "dashboard",
    onBeforeAction: function()
    {
        if (!Meteor.userId())
        {
            this.redirect("login");
            return;
        }
        
        this.next();
    }
});

Router.route("login", {
    name: "login",
    template: "login"
});

Router.route("logout", {
    name: "logout",
    template: "home",
    onBeforeAction: function()
    {
        Meteor.logout();
        this.next();
    }
});
