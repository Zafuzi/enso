import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {version} from "./version";

Meteor.startup(function()
{
	console.log(`version - ${version}`);
});

if(Meteor.isClient)
{
	// ALWAYS get user data
	FlowRouter.wait();
	Meteor.subscribe("userData",
		{
			onReady: function() { FlowRouter.initialize() }
		});
}

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		this.render('appLayout', { page: 'home' });
	}
});

FlowRouter.route('/about', {
	name: 'about',
	action: function() {
		this.render('appLayout', { page: 'about' });
	}
});

FlowRouter.route('/contact', {
	name: 'contact',
	action: function() {
		this.render('appLayout', { page: 'contact' });
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	action: function() {
		this.render('appLayout', { page: 'profile' });
	}
});

FlowRouter.route('/login', {
	name: 'register',
	action: function() {
		this.render('appLayout', { page: 'login' });
	}
});

FlowRouter.route('/register', {
	name: 'register',
	action: function() {
		this.render('appLayout', { page: 'register' });
	}
});

FlowRouter.route('/logout', {
	name: 'logout',
	action: function() {
		Meteor.logout(function(err) {
			FlowRouter.go("home");
		});
	}
});
