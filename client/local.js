import { ReactiveDict } from 'meteor/reactive-dict';

Template.logout.events({
	'click'() { Meteor.logout(); }
});

Template.login.onCreated(function() {
	this.state = new ReactiveDict();
	this.state.set("username", "");
	this.state.set("password", "");
	this.state.set("error", "");
});

Template.login.helpers({
	error() {
		return Template.instance().state.get("error");
	}
});

Template.login.events({
	'click #login_form [name="login"]'(event, instance) {
		event.preventDefault();
		console.log(instance.state.all());
		Meteor.loginWithPassword( instance.state.get("username"), instance.state.get("password"), function( err ) {
			if( err ) {
				instance.state.set("error", err.reason);
			}
		});
	},
	'click #login_form [name="register"]'(event, instance) {
		event.preventDefault();
		Accounts.createUser( instance.state.all(), err => {
			if( err ) {
				instance.state.set("error", err.reason);
			}
		});
	},
	'input #login_form [name="username"]'(event, instance) {
		instance.state.set("username", event.target.value);
	},
	'input #login_form [name="password"]'(event, instance) {
		instance.state.set("password", event.target.value);
	}
});
