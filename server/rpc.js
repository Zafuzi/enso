import {Meteor} from 'meteor/meteor';
import {Messenger} from "../lib/collections/messages";
import {isAdmin} from "../lib/lib";
import {check} from "meteor/check";

Meteor.startup(() =>
{
    // code to run on server at startup
});

Meteor.methods(
{
    ping: function()
    {
        return "pong";
    },
    
    sendMessage(receiverId, message)
    {
        check(receiverId, String);
        check(message, String);
        
        const userId = Meteor.userId();
        
        // check that user is loggedIn 
        if (!userId) {
            throw new Meteor.Error('not-logged-in');
        }
        
        // only allow admins to send messages
        if (!isAdmin(userId)) {
            throw new Meteor.Error('not-authorized');
        }
        
        // send a message to a user
        return Messenger.send(userId, receiverId, message);
    },
    
    deleteMessage(messageId)
    {
        check(messageId, String);
        
        const userId = Meteor.userId();
        
        // check that user is loggedIn 
        if (!userId) {
            throw new Meteor.Error('not-logged-in');
        }
        
        console.log("deleteMessage", messageId);
        // delete message by archiving it
        return Messenger.delete(messageId);
    },
    
    getMessagesForCurrentUser()
    {
        const userId = Meteor.userId();
        
        // check that user is logged in
        if (!userId) {
            throw new Meteor.Error('not-logged-in');
        }
        
        // get all messages for a user that are not archived
        return Messenger.getMessages(userId);
    }
});
