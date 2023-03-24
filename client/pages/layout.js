import {APP_VERSION} from "../../lib/lib";
import {closeModal, openModal} from "../components/modal/modal";

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
export const WIDEER_SCREEN_WIDTH = 1600;

Template.layout.onCreated(function()
{
    const currentRoute = Router.current().route.getName();
    document.title = `${document.title} - ${APP_VERSION}`;
    
    this.isDrawerOpen = new ReactiveVar(false);
})

Template.layout.helpers({
    showAppDrawer()
    {
        return Session.get("screenSize") <= MEDIUM_SCREEN_WIDTH;
    },
    class_isDrawerOpen()
    {
        return Template.instance().isDrawerOpen.get() ? "drawerOpen" : "";
    },
    isDrawerOpen()
    {
        return Template.instance().isDrawerOpen.get();
    }
});

Template.layout.events({
    "click #App_header_toggleDrawer"()
    {
        Template.instance().isDrawerOpen.set(!Template.instance().isDrawerOpen.get());
    },
    "click"(event, instance)
    {
        // if the event was not on the drawer, close it
        if(event.target.closest("#App_drawer"))
        {
            // allow links to close
            if(!event.target.closest("a"))
            {
                return;
            }
        }
        instance.isDrawerOpen.set(false);
    }
});