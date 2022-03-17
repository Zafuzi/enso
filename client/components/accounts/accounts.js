import {FlowRouter} from "meteor/ostrio:flow-router-extra";
import {showErrorIfError} from "../../../lib/lib";

Template.login.onCreated(function()
{
	this.state = new ReactiveDict({
		email: "",
		password: "",
		error: "",
	});
});

Template.login.helpers({
	error: function()
	{
		return Template.instance().state.get("error");
	}
});

Template.login.events({
	'submit #login_form'(event, instance) {
		event.preventDefault();
		let state = instance.state.all();
		Meteor.loginWithPassword( state.email, state.password, function( error  ) {
			if( showErrorIfError(error) ) {
				console.error(error);
				if(error.reason)
				{
					instance.state.set("error", error.reason);
				}
				return;
			}
			FlowRouter.go("home");
		});
	},
	'input #login_form [name="email"]'(event, instance) {
		instance.state.set("email", event.target.value);
	},
	'input #login_form [name="password"]'(event, instance) {
		instance.state.set("password", event.target.value);
	}
});

Template.register.onCreated(function() {
	this.state = new ReactiveDict({
		email: "",
		username: "",
		password: "",
		error: "",
	});
});

Template.register.helpers({
	error() {
		return Template.instance().state.get("error");
	}
});

Template.register.events({
	'submit #register_form'(event, instance) {
		event.preventDefault();
		Meteor.call('registerUser', instance.state.all(), function(error) {
			if( showErrorIfError(error) ) {
				if(error.reason)
				{
					instance.state.set("error", error.reason);
				}
				return;
			}
			FlowRouter.go("login");
		});
	},
	'input #register_form [name="email"]'(event, instance) {
		instance.state.set("email", event.target.value);
	},
	'input #register_form [name="username"]'(event, instance) {
		instance.state.set("username", event.target.value);
	},
	'input #register_form [name="password"]'(event, instance) {
		instance.state.set("password", event.target.value);
	}
});
