import { ReactiveDict } from 'meteor/reactive-dict';

Template.login.onCreated(function() {
	this.state = new ReactiveDict();
	this.state.set("email", "");
	this.state.set("password", "");
	this.state.set("error", "");
});

Template.login.helpers({
	error() {
		return Template.instance().state.get("error");
	}
});

Template.login.events({
	'submit #login_form'(event, instance) {
		event.preventDefault();
		let data = instance.state.all();
		Meteor.loginWithPassword( data.email, data.password, function( err ) {
			if( err ) {
				instance.state.set("error", err.reason);
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
	this.state = new ReactiveDict();
	this.state.set("email", "");
	this.state.set("username", "");
	this.state.set("password", "");
	this.state.set("error", "");
});

Template.register.helpers({
	error() {
		return Template.instance().state.get("error");
	}
});

Template.register.events({
	'submit #register_form'(event, instance) {
		event.preventDefault();
		Meteor.call('user.register', instance.state.all(), err => {
			if( err ) {
				instance.state.set("error", err.reason);
				return;
			}
			FlowRouter.go("home");
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
