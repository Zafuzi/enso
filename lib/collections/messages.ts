import {isAdmin} from "../lib";

export const SYSTEM_USER_ID = 'system';

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    sender: { _id: string };
    receiver: { _id: string };
}

export const Messages = new Mongo.Collection<Message>('messages');

// a message is for a user and is sent by another user OR by the system
export const Messenger = {
    send(senderId:string, receiverId:string, message: string)
    {
        check(senderId, String);
        check(receiverId, String);
        check(message, String);

        const sender = Meteor.users.findOne(senderId, { fields: { _id: 1 } });
        const receiver = Meteor.users.findOne(receiverId, { fields: { _id: 1 } });
        
        console.log(sender, receiver);
        
        // send a message to a user
        return Messages.insert(<Message>{
            senderId,
            receiverId,
            message,
            createdAt: new Date(),
            sender,
            receiver,
        });
    },
    delete(messageId)
    {
        const userId = Meteor.userId();
        
        // get message
        const message : Message = Messages.findOne({ _id: messageId });
        
        if(!message) {
            throw new Meteor.Error('Could not find message');
        }
            
        // check that user is either the sender or the receiver
        if (message.senderId !== userId && message.receiverId !== userId) {
            // allow admins to delete messages for other people
            if (!isAdmin(userId)) {
                throw new Meteor.Error('not-authorized');
            }
        }
        
        // delete message by archiving it
        return Messages.update({ _id: message._id }, {
            $set: { archived: new Date() }
        });
    },
    sendSystem(receiverId, message)
    {
        // send a message to a user from the system
        this.send(SYSTEM_USER_ID, receiverId, message);
    },
    getMessages(userId)
    {
        // check that userId matches loggedIn user
        if (userId !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }
        
        // get all messages for a user that do not have the archived field set
        
        return Messages.find({ receiverId: userId, archived: {$exists: false} }, {
            sort: { createdAt: -1 },
            fields: {
                senderId: 1,
                message: 1,
                createdAt: 1,
                sender: 1,
                receiver: 1,
            },
            limit: 100,
        }).fetch();
    }
}