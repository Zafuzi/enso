Template.dashboard.events({
    'click #logoutButton'(event)
    {
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
})