import {showAlert} from "../../components/alert/alert";

Template.login.onCreated(function()
{
    this.showLogin = new ReactiveVar(true);
});

Template.login.helpers({
    showLogin()
    {
        return Template.instance().showLogin.get();
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
            Meteor.loginWithPassword(username || email, password, function(error)
            {
                if (error)
                {
                    console.error(error);
                    showAlert("error", error.reason);
                    return;
                }
                
                Router.go("/");
            });
            
            return;
        }
        
        Accounts.createUser({email, username, password}, function(error)
        {
            if (error)
            {
                console.error(error);
                showAlert("error", error.reason);
            }
            
            Router.go("/");
        });
    }
})