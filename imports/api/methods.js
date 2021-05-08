Meteor.methods({
	'user.register'( data ) {
		Accounts.createUser({
			email: data.email,
			username: data.username,
			password: data.password
		});
	}
});
