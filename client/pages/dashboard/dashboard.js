import {showAlert} from "../../components/alert/alert";

Template.dashboard.onCreated(function()
{
    const instance = this;
    
    instance.messages = new ReactiveVar([]);
    
    instance.refresh = function()
    {
        Meteor.call('getMessagesForCurrentUser', (error, messages) => {
            if(error) {
                showAlert("error", "Could not get messages", error);
                throw new Meteor.Error('Could not get messages', error);
            }

            console.log(messages);
            instance.messages.set(messages);
        });
    }
});

Template.dashboard.onRendered(function()
{
    const instance = this;
    
    instance.refresh();
});

Template.dashboard.helpers({
    messagesCount()
    {
        return Template.instance().messages.get().length;
    },
    messages()
    {
        return Template.instance().messages.get();
    }
});

Template.dashboard.events({
    'click #logoutButton'(event)
    {
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    },
    "submit #sendMessageForm"(event, instance)
    {
        event.preventDefault();
        
        const receiverId = event.target.receiverId.value;
        const message = event.target.message.value;
        
        
        Meteor.call('sendMessage', receiverId, message, (error, result) => {
            if(error) {
                showAlert("error", `Could not send message: ${error?.reason}`);
                throw new Meteor.Error('Could not send message', error);
            }

            instance.refresh();
        });
    },
    "click .deleteMessage"(event, instance)
    {
        event.preventDefault();
        
        const messageId = event.target.dataset?.id;
        
        Meteor.call('deleteMessage', messageId, (error, result) => {
            if(error) {
                showAlert("error", `Could not delete message: ${error?.reason}`);
                throw new Meteor.Error('Could not delete message', error);
            }
            
            instance.refresh();
        });
    }
});