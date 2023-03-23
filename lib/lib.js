export const isAdmin = (userId) => {
    const user = Meteor.users.findOne(userId, { fields: { isAdmin: 1 } });
    return user && user.isAdmin;
}