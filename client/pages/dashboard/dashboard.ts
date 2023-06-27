import {Instance} from "../../helpers";

interface tDashboard extends Blaze.TemplateInstance
{
    messages: ReactiveVar<any[]>;
    refresh: () => void;
}

Template.dashboard.onCreated(function()
{
    const instance = this;
    
    instance.messages = new ReactiveVar([]);
    
    instance.refresh = function()
    {
        Meteor.call('getMessagesForCurrentUser', (error, messages) => {
            if(error) {
                throw new Meteor.Error('Could not get messages', error);
            }

            // console.log(messages);
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
        return (<tDashboard>Instance()).messages.get().length;
    },
    messages()
    {
        return (<tDashboard>Instance()).messages.get();
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
        
        
        Meteor.call('sendMessage', receiverId, message, (error: Meteor.Error) => {
            if(error) {
                console.error("error", `Could not send message: ${error.reason}`);
                return;
            }

            instance.refresh();
        });
    },
    "click .deleteMessage"(event, instance)
    {
        event.preventDefault();
        
        const messageId = event.target.dataset?.id;
        
        Meteor.call('deleteMessage', messageId, (error: Meteor.Error) => {
            if(error) {
                console.error("error", `Could not delete message: ${error.reason}`);
                return;
            }
            
            instance.refresh();
        });
    }
});