import {APP_VERSION} from "../../lib/lib";
import {Instance} from "../helpers";

Meteor.call("ping", function(error, result)
{
	console.log(result);
});

Session.set("screenSize", window.innerWidth);

window.addEventListener("resize", function()
{
    Session.set("screenSize", window.innerWidth);
});

export const SMALL_SCREEN_WIDTH = 400;
export const MEDIUM_SCREEN_WIDTH = 700;
export const LARGE_SCREEN_WIDTH = 900;
export const WIDE_SCREEN_WIDTH = 1100;
export const WIDER_SCREEN_WIDTH = 1600;

interface tLayout extends Blaze.TemplateInstance {
    isDrawerOpen: ReactiveVar<boolean>;
}

Template.layout.onCreated(function()
{
    document.title = `${document.title} - ${APP_VERSION}`;
    this.isDrawerOpen = new ReactiveVar(false);
});

Template.layout.helpers({
    showAppDrawer()
    {
        return Session.get("screenSize") <= MEDIUM_SCREEN_WIDTH;
    },
    class_isDrawerOpen()
    {
        return (<tLayout>Instance()).isDrawerOpen.get() ? "drawerOpen" : "";
    },
    isDrawerOpen()
    {
        return (<tLayout>Instance()).isDrawerOpen.get();
    }
});

Template.layout.events({
    "click #App_drawer a, click #App_content, click #App_header, click #App_footer"(event, instance)
    {
        if(instance.isDrawerOpen.get())
        {
            instance.isDrawerOpen.set(false);
        }
    },
    "click #App_header_toggleDrawer"(event)
    {
        event.stopPropagation();
        (<tLayout>Instance()).isDrawerOpen.set(!(<tLayout>Instance()).isDrawerOpen.get());
    },
});