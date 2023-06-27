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


        // disable form for 1 second
        event.target.email?.setAttribute("disabled", "disabled");
        event.target.username?.setAttribute("disabled", "disabled");
        event.target.password?.setAttribute("disabled", "disabled");

        // disable submit button
        event.target.querySelector("button[type=submit]")?.setAttribute("disabled", "disabled");


        Meteor.setTimeout(function()
        {
            event.target.email?.removeAttribute("disabled");
            event.target.username?.removeAttribute("disabled");
            event.target.password?.removeAttribute("disabled");
            event.target.querySelector("button[type=submit]")?.removeAttribute("disabled");
        }, 1000);

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