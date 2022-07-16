import {showAlert} from "../../components/alert/alert";
import {closeModal, openModal} from "../../components/modal/modal";

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
		console.log("alert");	
		openModal("alertModal", {
			class: "container-900"
		});
	},

});

Template.alertModal.events(
{
	"click .home__closeModalButton": function()
	{
		closeModal();
	}
});