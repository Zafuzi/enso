export const APP_VERSION = "0.0.1 - Appleseed";

export interface AppUser extends Meteor.User {
    isAdmin?: boolean;
}

export const isAdmin = (userId) => {
    const user : AppUser = Meteor.users.findOne(userId, { fields: { isAdmin: 1 } });
    return user && user.isAdmin;
}