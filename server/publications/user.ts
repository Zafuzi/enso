import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function () {
	if (this.userId) {
		return Meteor.users.find({ _id: this.userId }, {
			fields: { isAdmin: 1 }
		});
	} else {
		this.ready();
	}
});
