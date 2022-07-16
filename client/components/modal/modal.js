export var openModal = null;
export var closeModal = null;

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
	}
});

Template.modal.events(
{
	"click .modal__closeButton": function(event, instance)
	{
		closeModal();
	}
});