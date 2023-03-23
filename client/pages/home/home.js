import {showAlert} from "../../components/alert/alert";
import {closeModal, openModal} from "../../components/modal/modal";

Template.modal__shortStory.onCreated(function()
{
    const instance = this;
    
    instance.loremContent = new ReactiveVar([]);

    HTTP.call("GET", "https://picsum.photos/v2/list?page=2&limit=4", function(error, result)
    {
        if (error)
        {
            console.log("error", error);
            instance.loremContent.set(error);
        }
        if (result)
        {
            instance.loremContent.set(result.data);
        }
    })
});

Template.modal__shortStory.helpers({
    loremContent()
    {
        return Template.instance().loremContent.get();
    }
});

Template.home.events(
{
	"click .home__showSuccess": function()
	{
		showAlert("success", "Success!");
	},
	"click .home__showError": function()
	{
		showAlert("error", "This, is an error! It forces a response!", {
			forceResponse: true
		});
	},
	"click .home__showWarning": function()
	{
		showAlert("warning", "Something has gone quite horribly wrong.");
	},
	"click .home__showInformation": function()
	{
		showAlert("information", "Just so you know, it's fyi...");
	},
	"click .home__openModalButton": function()
	{
		openModal("alertModal", {
			class: "container-700",
			title: "Alert..."
		});
	},
	"click .home__openShortStoryButton": function()
	{
		openModal("modal__shortStory", {
			class: "container-700",
			title: "Some nice photos...",
			footerTemplate: "footer__shortStory"
		});
	},
});