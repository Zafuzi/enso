Meteor.methods(
{
	'registerUser'( data ) {
		Accounts.createUser({
			email: data.email,
			username: data.username,
			password: data.password
		});
	}
});
