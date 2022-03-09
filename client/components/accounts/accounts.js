import {FlowRouter} from "meteor/ostrio:flow-router-extra";

Template.login.onCreated(function()
{
	this.data.set("email", "");
	this.data.set("password", "");
	this.data.set("error", "");
});

Template.login.helpers({
	error: function()
	{
		return Template.instance().data.get("error");
	}
});

Template.login.events({
	'submit #login_form'(event, instance) {
		event.preventDefault();
		let data = instance.data.all();
		Meteor.loginWithPassword( data.email, data.password, function( error  ) {
			if( error ) {
				if ("reason" in error) {
					instance.data.set("error", error.reason);
				}
				return;
			}
			FlowRouter.go("home");
		});
	},
	'input #login_form [name="email"]'(event, instance) {
		instance.data.set("email", event.target.value);
	},
	'input #login_form [name="password"]'(event, instance) {
		instance.data.set("password", event.target.value);
	}
});

Template.register.onCreated(function() {
	this.data.set("email", "");
	this.data.set("username", "");
	this.data.set("password", "");
	this.data.set("error", "");
});

Template.register.helpers({
	error() {
		return Template.instance().data.get("error");
	}
});

Template.register.events({
	'submit #register_form'(event, instance) {
		event.preventDefault();
		Meteor.call('user.register', instance.data.all(), function(error) {
			if( error ) {
				if("reason" in error)
				{
					instance.data.set("error", error.reason);
				}
				return;
			}
			FlowRouter.go("login");
		});
	},
	'input #register_form [name="email"]'(event, instance) {
		instance.data.set("email", event.target.value);
	},
	'input #register_form [name="username"]'(event, instance) {
		instance.data.set("username", event.target.value);
	},
	'input #register_form [name="password"]'(event, instance) {
		instance.data.set("password", event.target.value);
	}
});
