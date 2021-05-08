FlowRouter.route('/', {
	name: 'home',
	action: function() {
		BlazeLayout.render('appLayout', { page: 'home' });
	}
});

FlowRouter.route('/login', {
	name: 'register',
	action: function() {
		BlazeLayout.render('appLayout', { page: 'login' });
	}
});

FlowRouter.route('/register', {
	name: 'register',
	action: function() {
		BlazeLayout.render('appLayout', { page: 'register' });
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