import {Instance} from "../../helpers";
import {Alert} from "../../alerts";

interface tLogin extends Blaze.TemplateInstance {
    showLogin: ReactiveVar<boolean>;
}

Template.login.onCreated(function()
{
    const self : tLogin = this;
    self.showLogin = new ReactiveVar(true);
});

Template.login.helpers({
    showLogin()
    {
        return (<tLogin>Instance()).showLogin.get();
    }
});

Template.login.events({
    "click .login__showRegister"(event, template)
    {
        template.showLogin.set(false);
    },
    "click .login__showLogin"(event, template)
    {
        template.showLogin.set(true);
    },
    "submit #loginForm"(event, template)
    {
        event.preventDefault();

        const email = event.target.email?.value;
        const username = event.target.username?.value;
        const password = event.target.password?.value;
        
        const isLogin = template.showLogin.get();
        
        if (isLogin)
        {
            Meteor.loginWithPassword(username || email, password, function(error: Meteor.Error)
            {
                if (error)
                {
                    console.error(error);
                    Alert.error(error.reason);
                    return;
                }
                
                Router.go("/");
            });
            
            return;
        }
        
        Accounts.createUser({email, username, password}, function(error: Meteor.Error)
        {
            if (error)
            {
                console.error(error);
                Alert.error(error.reason);
                return;
            }
            
            Router.go("/");
        });
    }
})