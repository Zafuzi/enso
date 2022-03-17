import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {version} from "./version";

Meteor.startup(function()
{
	console.log(`version - ${version}`);
});

FlowRouter.route('/', {
	name: 'home',
	action: function() {
		this.render('appLayout', { page: 'home' });
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
