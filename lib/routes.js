if (Meteor.isClient)
{
	Router.configure({

		title: "Plankton",

		layoutTemplate: "layout",

		//notFoundTemplate: 'pageNotFound',
		//loadingTemplate: 'loading',
		
		waitOn: function()
		{
			// Meteor.subscribe("userData");
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