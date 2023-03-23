export var openModal = null;
export var closeModal = null;
export var pageBottom = window.innerHeight;

Template.modal.onCreated(function()
{
	let self = this;
	
	// only one modal is allowed open at once
	self.status = new ReactiveVar("closed");
	self.template = new ReactiveVar(null);
	self.footerTemplate = new ReactiveVar(null);
	self.options = new ReactiveVar(null);
	self.isClosing = new ReactiveVar(null);
	
	self.openModal = function(templateName, options)
	{
		self.template.set(templateName);
		self.footerTemplate.set(options?.footerTemplate);
		self.options.set(options);
		self.status.set("open");
	}
	
	openModal = self.openModal;
	
	self.closeModal = function()
	{
		self.isClosing.set(true);
		Meteor.setTimeout(function()
		{
			self.status.set("closed");
			self.template.set(null);
			self.options.set(null);
			self.isClosing.set(null);
		}, 300);
	}
	
	closeModal = self.closeModal;
});

Template.modal.helpers(
{
	isModalOpen: function()
	{
		let isOpen = Template.instance().status.get() === "open";
		if(isOpen)
		{
			document.body.style.overflowY = "hidden";
			document.documentElement.style.overflowY = "hidden";
		}
		else 
		{
			document.body.removeAttribute("style");
			document.documentElement.removeAttribute("style");
		}
		
		return isOpen;
	},
	template: function()
	{
		return Template.instance().template.get();
	},
	footerTemplate: function()
	{
		return Template.instance().footerTemplate.get();
	},
	options: function()
	{
		return Template.instance().options.get();
	},
	isClosing: function()
	{
		return Template.instance().isClosing.get() ? "isClosing" : "";
	},
	pageBottom: function()
	{
		return pageBottom;
	}
});

Template.modal.events(
{
	"click .modal__closeButton"(event, instance)
	{
		closeModal();
	},
    "click .modal-wrapper"(event)
    {
        // ignore events that are not on the wrapper itself
        if (event.target !== event.currentTarget) {
            return;
        }
        
        closeModal();
    }
});

window.addEventListener("resize", function()
{
	pageBottom = window.innerHeight;
});