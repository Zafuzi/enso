export const APP_VERSION = "0.0.1 - Appleseed";

export const isAdmin = (userId) => {
    const user = Meteor.users.findOne(userId, { fields: { isAdmin: 1 } });
    return user && user.isAdmin;
}